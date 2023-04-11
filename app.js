// Import express. Supported by Node.js, lets us include modules in our project.
let express = require('express');

// Instantiate express application
let app = express();

// Use environment variable specified at command line, or if none provided, 3000 default
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});

// Setup a static server for all files in /public
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


// Serve main.html as the default page
app.get('/', (req, res) => {
    res.redirect('/home.html');
  });
  
  // Serve a static HTML file for /main.html
  app.get('/home.html', (req, res) => {

    res.sendFile(__dirname + '/home.html');
  });