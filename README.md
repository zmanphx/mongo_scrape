# mongo_scrape
Mongo Scrape  - Node.js Mongo.db application in MVC model layout.

The application will peform a web scrape of headlines from the  "www.washington.post" website. When the application is first started, the server will attempt to scrape articles from the news site using  NPM axios .  NPM Cheerios is used to select the specfied DOM elements tags.

A JSON object is built from the result of the scrape which is then used to do a bulk insert into a mongo.db database. The NPM Mongoose is used to connect to the mongo.db database and peform the various  querying routines. 

Mongo Scrape has two models that are built for mongo db: Articles and Notes.  Articles can have notes attached .  As part of the application the  user can select an article and save notes to the article . To avoid inserting duplicate records/documents , I added an index to the Articles collection. " db.articles.createIndex( { "title_id": 1 }, { unique: true } )"  This will prevent a "document" from being inserted if the title is the same.  If a duplicate record is encountered, a key violation is returned from the database as an exception. The exception is handled in a "catch" .  Only records that don't violate the unique key "title" are allowed to be inserted. 

NPM Handlebars template engine is used to render the articles to the web page. 
Users can also view the contents of the database in JSON by clicking  on a button for Articles and button for Notes. 



