const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const path = require("path")

const app = express();

app.use(json());
app.use(cors());

app.use(express.static(path.join(__dirname, "build")))

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

require("./controllers/authController")(app) 
require("./controllers/modsController")(app)
require("./controllers/systemController")(app)

app.listen(8080, console.log("Run on PORT 8080"))