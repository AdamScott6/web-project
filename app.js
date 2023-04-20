// Import express and mongoose. Supported by Node.js, lets us include modules in our project.
let express = require("express");
let mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post.js");
const Chatslist = require("./models/chatslist");
const Messages = require("./models/messages");
const { ObjectId } = require("mongodb");
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

// if user successfully authenticated them goes to next() which proceeds to route handler otherwise
// it keeps routing user to login page
function requireLogin(req, res, next) {
  if (currentUserId != -1) {
    next();
  } else {
    res.redirect('/login');
  }
}


// Serve main.html as the default page
app.get("/", requireLogin, (req, res) => {
    res.redirect("/home.html");
});

// Serve a static HTML file for /main.html
app.get('/home', requireLogin, (req, res) => {
    User.find({})
        .then((profiles) => {
            res.sendFile(__dirname + "/public/home.html");
        });
});

// Current User Data for home.html
app.get("/home-user-data", requireLogin, (req, res) => {
    User.findById(currentUserId)
        .then((result) => {
            console.log(result)
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send('Internal server error');
        });
})

app.get('/chats', requireLogin, (req, res) => {
    User.find({})
        .then(() => {
            res.sendFile(__dirname + "/public/chats.html");
        });
});

app.get('/chatlog-details', async (req, res) => {
    try {
        const chatData = await Messages.find({});
        // console.log(chatData);
        res.json(chatData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
})

app.get("/chats-user-data", async (req, res) => {
  try {
    Chatslist.find({participants: { $in: new ObjectId(currentUserId) }})
        .then((result) => {
            // console.log("result is: ", result);
            res.json(result);
        })
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json();
  }
});

app.get('/chatlog/:chatID', async (req, res) => {
  try {
    const chats = await Messages.find({ chatID: new ObjectId(req.params.chatID)});
    console.log("chats is ", chats);
    res.json(chats);
  } catch (err) {
    res.status(404).send('User not found');
  }
});

// Get User document using userID
app.get('/users/:userId', async (req, res) => {
  try {
    // console.log("req.params.userId is ",req.params.userId);  
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(404).send('User not found');
  }
});

app.get('/chatlog', async (req, res) => {
    User.find({})
        .then(() => {
            res.sendFile(__dirname + "/public/chatLog.html");
        });
})

app.post("/add-message", (req, res) => {
    const chatID = req.body.chatID;
    const sender = req.body.sender;
    const recipient = req.body.recipient;
    const message = req.body.message;

    const newMessage = new Messages({
        chatID,
        sender,
        recipient,
        message, 
      });

      newMessage.save()
      .then(() => {
        
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Internal server error");
      });
});

// User routes
// GET call for current user (hardcoded user)
app.get('/current-user', requireLogin, (req, res) => {
    User.findById(currentUserId)
        .then((result) => {
            console.log(result)
            res.send(result);
        })
        .catch((error) => {
            res.status(500).send('Internal server error');
        });
})

// GET user by userId
app.get('/getUser/:userId', async (req, res) => {
  User.findById(new ObjectId(req.params.userId))
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send('Internal server error');
    });
})

//------------------------
// display profile details in profile.html

app.get('/profile', requireLogin, (req, res) => {
    User.find({})
        .then((profiles) => {
            res.sendFile(__dirname + "/public/profile.html");
        });
});

app.get("/profile-data", requireLogin, async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: currentUserId }).sort({ createdAt: "desc" });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


app.get("/profile-details", requireLogin, async (req, res) => {
  try {
    const profileData = await User.find({ _id: currentUserId });
    res.json(profileData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


app.post("/add-post", requireLogin, (req, res) => {
  // new post instance created with request from body data
  const newPost = new Post({
    content: req.body.post,
    createdBy: currentUserId // current user id need to be set
  });

  // new post is saved to database
  newPost.save()
    .then(savedPost => {
      res.redirect(req.get('referer')); // this redirects back to profile page
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Unable to save post to database");
    });
});



app.post("/update-bio", (req, res) => {
  const userId = currentUserId;
  const { aboutMe } = req.body;

  User.findByIdAndUpdate(
    userId,
    { $set: { aboutMe } },
    { new: true }
  )
    .then((updatedBio) => {
      res.json(updatedBio);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});



//------------------------
app.get('/settings', (req, res) => {
    User.find({})
        .then((profiles) => {
            res.sendFile(__dirname + "/public/settings.html");
        });
});

// fetching profile settings for settings.html
app.get("/settings-data", requireLogin, async (req, res) => {
    console.log(currentUserId)
    try {
        if (currentUserId === -1){
            res.send(undefined)
        }
        else{
            const profileData = await User.findById(currentUserId);
            res.json(profileData);
        }
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
    if (currentUserId != -1){
        // res.sendFile(__dirname + "/public/account.html");
        User.find({})
        .then((account) => {
            console.log('automatic login');
            res.sendFile(__dirname + "/public/account.html");
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            res.status(500).send('Internal Server Error');
        });
    }
    else {
        console.log(currentUserId);
        res.sendFile(__dirname + "/public/login.html");
    }
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

// GET all posts 
app.get("/all-posts", async (req, res) => {
  Post.find()
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send('Internal server error');
      });
})

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

app.post("/change-fullName", (req, res) => {
    if (currentUserId != -1) {
        const newFullName = req.body.newFullName;
        User.findByIdAndUpdate(
            currentUserId,
            { fullName: newFullName },
            { new: true }
        )
            .then((result) => {
                console.log("fullName updated:", result.newFullName);
                res.send("fullName updated");
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
    const fullName = req.body.fullName;
    const password = req.body.password;

    const newUser = new User({
        username,
        fullName,
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

app.post("/logout-function", (req, res) => {
    currentUserId = -1;
    res.send('User has logged out')
});

