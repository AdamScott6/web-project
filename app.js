// Import express and mongoose. Supported by Node.js, lets us include modules in our project.
let express = require("express");
let mongoose = require("mongoose");
let User = require("./models/user");

// Instantiate express application
let app = express();

// Connect to MongoDB
let dbURI =
  "mongodb+srv://admin1:admin1@cluster0.bqrrhmm.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
    // Use environment variable specified at command line, or if none provided, 3000 default
    app.set("port", process.env.PORT || 3000);

    app.listen(app.get("port"), function () {
      console.log(`Listening for requests on port ${app.get("port")}.`);
    });
  })
  .catch((error) => console.log(error));

// Setup a static server for all files in /public
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// routes
// Serve main.html as the default page
app.get("/", (req, res) => {
  res.redirect("/home.html");
});

// Serve a static HTML file for /main.html
app.get("/home.html", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});
