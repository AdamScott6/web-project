// Import express and mongoose. Supported by Node.js, lets us include modules in our project.
let express = require("express");
let mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post.js");
let currentUserId = -1;

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
    User.findById(currentUserId)
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
        User.findByIdAndUpdate(req.body.id, { isLightMode: req.body.isLightMode })
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
        User.findByIdAndUpdate(req.body.id, { accountIsPrivate: req.body.accountIsPrivate })
            .then(() => {
                // console.log(User.findById(req.body.id));
            })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
})

//------------------------
// display account details in account.html

app.get('/login', (req, res) => {
    currentUserId = -1;
    console.log(currentUserId);
    res.sendFile(__dirname + "/public/login.html");
});

app.get('/account', (req, res) => {
    currentUserId = req.query.currentUserId;

    if (!mongoose.Types.ObjectId.isValid(currentUserId)) {
        return res.status(400).send('Invalid currentUserId');
    }

    User.find({})
        .then((account) => {
            console.log('accountId:', currentUserId);
            res.sendFile(__dirname + "/public/account.html");
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.get("/account-data", async (req, res) => {
    try {
        const accountData = await User.find({});
        res.json(accountData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});

app.post("/change-username", (req, res) => {
    if (currentUserId != -1) {
        const newUsername = req.body.newUsername;
        User.findByIdAndUpdate(
            currentUserId,
            { username: newUsername },
            { new: true }
        )
            .then((result) => {
                console.log("Username updated:", result.username);
                res.send("Username updated");
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error");
            });
    }
});

app.post("/change-profile-picture", (req, res) => {
    if (currentUserId != -1) {
        const newProfilePicture = req.body.newProfilePicture;
        User.findByIdAndUpdate(
            currentUserId,
            { profilePicture: newProfilePicture },
            { new: true }
        )
            .then((result) => {
                console.log("profilePicture updated:", result.ProfilePicture);
                res.send("profilePicture updated");
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error");
            });
    }
});

app.post("/change-password", (req, res) => {
    if (currentUserId != -1) {
        const newPassword = req.body.newPassword;
        User.findByIdAndUpdate(
            currentUserId,
            { password: newPassword },
            { new: true }
        )
            .then((result) => {
                console.log("password updated:", result.Password);
                res.send("password updated");
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send("Internal server error");
            });
    }
});

app.post("/create-account", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({
        username,
        password,
      });

      newUser.save()
      .then((user) => {
        console.log(`User ${user.username} created`);
        res.send(`User ${user.username} created`);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Internal server error");
      });
});