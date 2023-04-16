// Import express and mongoose. Supported by Node.js, lets us include modules in our project.
let express = require("express");
let mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post.js")

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
app.use(express.urlencoded({ extended: true })); 

// routes
// Serve main.html as the default page
app.get("/", (req, res) => {
  res.redirect("/home.html");
});

// Serve a static HTML file for /main.html
app.get("/home.html", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

// User routes
// GET call for current user (hardcoded user)
app.get('/current-user', (req, res) => {
  User.findById("64399fc89865cf45fed85888")
    .then((result) => {
      console.log(result)
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send('Internal server error');
    });
})

//------------------------
// display profile details in profile.html

app.get('/profile', (req, res) => {
  User.find({})
    .then((profiles) => {
      res.sendFile(__dirname + "/public/profile.html");
    });
  });

app.get("/profile-data", async (req, res) => {
  try {
    const profileData = await User.find({});
    res.json(profileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//------------------------
// fetching profile settings for settings.html
app.get("/settings-data", async (req, res) => {
  try {
    const profileData = await User.find({});
    res.json(profileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// updating theme
app.post("/settings-updatetheme", (req, res) => {
  try {
    console.log(req.body.isLightMode)
    User.findByIdAndUpdate(req.body.id, {isLightMode: req.body.isLightMode})
    .then(() => {
      // console.log(User.findById(req.body.id));
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
})

// updating privacy
app.post("/settings-updateprivacy", (req, res) => {
  try {
    User.findByIdAndUpdate(req.body.id, {accountIsPrivate: req.body.accountIsPrivate})
    .then(() => {
      // console.log(User.findById(req.body.id));
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
})