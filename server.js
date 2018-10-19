const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


const playbook = require("./routes/api/playbook");

// At the top of your server.js
process.env.PWD = process.cwd();

// Then
app.use(express.static(process.env.PWD + "/public"));

// bodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.get("/", function(req, res) {
  res.sendFile("index.html");
});

app.use("/api/playbook", playbook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

