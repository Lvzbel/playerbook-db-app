const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const hbs = require("express-handlebars");
const app = express();

const playbook = require('./routes/api/playbook');

// View Engine Setup
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/"
  })
);
app.set("view engine", "hbs");

// bodyParser Middleware
app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/playbook', playbook)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));