const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const hbs = require('express-handlebars');
const app = express();

let db;

// View Engine Setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');


// bodyParser Middleware
app.use(express.static(__dirname + "public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Index Route
app.get("/", (req, res) => {
  res.render('index');
});

// POST db
app.post("/db", (req, res) => {
  console.log(req.body);
});

// Server Setup
const PORT = process.env.PORT || 3000;

// Start server only if db is avaible
MongoClient.connect(
  "mongodb://test:test123@ds125453.mlab.com:25453/playbook_viewer_db",
  {
    useNewUrlParser: true
  },
  (err, client) => {
    if (err) return console.log(err);

    db = client.db("playbook_viewer_db");

    app.listen(PORT, () => {
      console.info(`Server has started on ${PORT}`);
    });
  }
);
