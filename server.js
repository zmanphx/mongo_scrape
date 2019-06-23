var express = require("express");
var app = express();
var mongojs = require("mongojs");
var logger = require("morgan");
var bodyParser = require('body-parser')
var mongoose = require("mongoose");
const path = require('path');
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

//For BodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/app"));


// Require all models
var db = require("./app/models");

var PORT = 3000;

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Initialize Express


// Database configuration
/* var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections); */
/* db.on("error", function(error) {
  console.log("Database Error:", error);
}); */



// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
//app.use(express.static("public"));
//app.use(express.static(__dirname +'/public/styles/'));
//app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
var exphbs = require("express-handlebars");
app.set('views', './app/views')
app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

/* app.get('/', function (req, res) {
  res.render('index');
}); */


// Connect to the Mongo DB
//mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Routes




require("./app/controller/mongo_controller.js")(app);

//app.use(routes);


// A GET route for scraping the echoJS website

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

module.exports= app;