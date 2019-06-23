var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var mongoose = require("mongoose");
var db = require("../models");

var axios = require("axios");
var cheerio = require("cheerio");
module.exports = function(app) {
  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios

    axios
      .get("https://www.washingtonpost.com/")
      .then(function(response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        var results = [];
        let cb;
        // Now, we grab every h2 within an article tag, and do the following:
        $(".no-skin").each(function(i, element) {
          //var address= $(element).data("url");
          //var city= $(element).data("propertyid");

          var title = $(element)
            .children(".headline")
            .text();
          var link = $(element)
            .find("a")
            .attr("href");
          var blurb = $(element)
            .children(".blurb")
            .text();

          blurb = blurb === "" ? "Blurb N/A" : blurb;

          var result = { title: title, link: link, blurb: blurb };

          /*  if (title) {
            results.push({
              title: title,
              link: link,
              blurb: blurb
            });
          } */
          if (title) {
            results.push(result);
          }

          // Save these results in an object that we'll push into the results array we defined earlier
        });

        db.Article.create(results)
          .then(function(dbArticle) {
            // View the added result in

            console.log(dbArticle);
            res.render("index",{"article": dbArticle});
            //************************************** */
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      })
      .finally(function() {
        // always executed
      });
  });

  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/", function(req, res) {
    // Grab every document in the Articles collection

    res.render("index");
  });

  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { note: dbNote._id },
          { new: true }
        );
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
};
// Export routes for server.js to use.
//module.exports = router;
