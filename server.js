////////////////////////////////////////////////////////////////////////////////
// ExpressJS dependencies.
////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var path = require('path');

// Requests (SuperAgent)
var request = require('superagent');

// Library to connect to a mongodb instance.
var MongoClient = require('mongodb').MongoClient;

// MongoDB options.
var MONGO = {
  host: process.env['MONGO_HOST'] || 'localhost',
  port: process.env['MONGO_PORT'] || '27017',
  database: 'ms-image-search-abstraction',
  collection: 'recent',
  credentials: {
    username: 'APP_MS_IMAGE_SEARCH_ABSTRACTION',
    password: process.env['APP_MS_IMAGE_SEARCH_ABSTRACTION']
  }
};

// Add connection string to MongoDB options.
MONGO['connString'] = 'mongodb://'
                    + MONGO.credentials.username
                    + ':' + MONGO.credentials.password
                    + '@' + MONGO.host
                    + ':' + MONGO.port
                    + '/' + MONGO.database;


////////////////////////////////////////////////////////////////////////////////
// Serve files from the ./dist folder.
////////////////////////////////////////////////////////////////////////////////
app.use(express.static('dist'));

////////////////////////////////////////////////////////////////////////////////
// Handles search query from client.
////////////////////////////////////////////////////////////////////////////////
app.get('/search', function(req, res) {

  // Extract request parameters from query string.
  var searchTerms = req.query.q;          // Search terms.
  var pageNum = parseInt(req.query.page); // Page number.

  // If an invalid page number is given, of if the page number is 0,
  // set it to page 1.
  if (isNaN(pageNum) || pageNum == 0) {
    pageNum = 1;
  };

  // HTTP GET request to Imgur.
  request('GET', 'https://api.imgur.com/3/gallery/search/')
    .set('Authorization', 'Client-ID ' + process.env.CLIENT_ID) // Client id.
    .query({q: searchTerms, page: pageNum - 1})                     // Search terms and page offset.
    .end(function(err, response) {

      // Parse server response results into JSON.
      //
      // Returns an object with key 'data' and its value a list of matching
      // results.
      var data = JSON.parse(response.text);

      // Only want the search results, which is the array under the 'data' key.
      data = data.data;

      // Redact unwanted keys in the search results.
      data = data.map(function(result, idx, arr) {

        // New object to hold only the keys we want to keep.
        let redactedResult = {};

        // Two cases:
        //  1) Images
        //  2) Image galleries
        //
        // If an image gallery was returned, make 'link' reference the cover
        // image. Its id is under the 'cover' property, and can be appended to
        // the URL http://i.imgur.com/ along with a file extension .jpg.
        // Want to display the cover image as the search result.
        if (result.hasOwnProperty('cover')) {

          // Image dimensions.
          redactedResult['width'] = result['cover_width'];
          redactedResult['height'] = result['cover_height'];

          // Image src.
          redactedResult['link'] = 'http://i.imgur.com/' + result['cover'] + '.jpg';

          // Link to gallery.
          redactedResult['gallery_link'] = result['link'];

        } else {

          // Image dimensions.
          redactedResult['width'] = result['width'];
          redactedResult['height'] = result['height'];

          // Image src.
          redactedResult['link'] = result['link'];

        };

        // Store the title.
        redactedResult['title'] = result['title'];

        // Return redacted result.
        return redactedResult;

      });// End map function (redact keys).

      // Connect to MongoDB database.
      MongoClient.connect(MONGO.connString, function(err, db) {

        // Error check.
        if (err) { return next(err); };

        // If database connection is a success, need to attempt connection to
        // a collection.
        db.collection(MONGO.collection, function(err, coll) {

          // Error check.
          if (err) { return next(err); };

          // If collection access is a success, need to create and store a document
          // containing the search terms, and the date and time the search watches
          // made.
          var date = new Date();
          var recentSearchDoc = {
            term: searchTerms,        // Search terms.
            when: date.toUTCString()  // Date.
          };

          // Insert document into collection.
          //
          // Write concern of 1: Requests acknowledgement that the write
          //  operation has propagated to the standalone mongod or the primary
          //  in a replica set.
          coll.insert(recentSearchDoc, {w:1}, function(err, result) {

            // Error check.
            if (err) { return next(err); };

            // Send response back to client.
            var response = {
              q: searchTerms,           // Search terms
              page: pageNum,            // Page number
              results: data,            // Search results
              num_results: data.length  // Number of results
            };
            res.send(response);

          }); // End document insert function.

        }); // End MongoDB collection access function.

      }); // End MongoDB DB access function..

    }); // End request callback..

});

////////////////////////////////////////////////////////////////////////////////
// Route to handle errors.
////////////////////////////////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

////////////////////////////////////////////////////////////////////////////////
// Server listening for connections.
////////////////////////////////////////////////////////////////////////////////
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Listening for connections on PORT ' + port);
});
