var port = process.env.PORT || 3000;

const http = require('http');
const ejs = require('ejs');
const express = require('express');
var path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://zetterburg40:Goalie29@cluster0.xbmwh.mongodb.net/excersiseapp?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


async function main() {
  await mongoose.connect(uri, { useNewUrlParser: true });
    // Use the client object to perform operations on the database
    console.log("connected!");
  }

main();

var Schema = mongoose.Schema;

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async function () {
  const collection  = connection.db.collection("excersiseapp");
  collection.find({}).toArray(function(err, data){
      test = data;
      return test;
  });
  console.log("Connected to Server")
});

var newUser = mongoose.model('excersiseapp', new Schema({
  username: String,
  password: String,
  email: String,
  weight: String
}, { collection: "test" }, { versionKey: false } ));

app.get("/", async function (req, res) {
  const message = "";
  const noUserMessage = "";

  res.render('home.ejs', {message: message, noUserMessage: noUserMessage});
});


app.set('view engine', 'ejs');

const server = http.createServer(app);

const message = "";


app.get('/', async (req, res) => {
  const message = "";
  const noUserMessage = "";

  res.render('home.ejs', {message: message, noUserMessage: noUserMessage});

});

app.get('/main/:name', async (req, res) => {
  var name = req.params.name;
  //console.log(collection);

  let test = newUser({
    username: req.body.name2,
    password: req.body.password2,
    email: req.body.email2,
    weight: req.body.weight2
  })

  const options = { wtimeout: 10000 };


  //check to see if user already Exists
  const userCheck = await newUser.find( { username: req.body.name2 } );
  console.log(userCheck, '<=usercheck')


  console.log(userCheck);
    if (userCheck.length > 0) {
        console.log("User Already Exists");
        const message = "Username Already Exist.";
        res.render('home.ejs', { message: message } );
      }

      else {
        await collection.insertOne(newUser, options, function(err, result) {
          console.log("Inserted form data <= 132");
      });
      test.save(async function() {
            console.log("user saved succesfully");
            res.render('main.ejs', {name});
          });
      }
});

app.post('/', async function(req, res) {
  const collection = client.db("excersiseapp").collection("excersiseapp");
  const message = "";
  const noUserMessage = "";
});

//route that will handle New Users
app.post('/main/:name', async function(req, res) {
  var name = req.params.name;
  const collection = client.db("excersiseapp").collection("excersiseapp1");

  //console.log(collection);

  let test = newUser({
    username: req.body.name2,
    password: req.body.password2,
    email: req.body.email2,
    weight: req.body.weight2
  })


  const options = { wtimeout: 10000 };

  //check for login


  //check to see if user already Exists
  const userCheck = await newUser.find( { username: req.body.name2 } );
  console.log(userCheck, '<=usercheck')

    if (userCheck.length > 0) {
        console.log("User Already Exists");
        const message = "Username Already Exist.";
        res.render('home.ejs', { message: message } );
      }

      else {
        await collection.insertOne(newUser, options, function(err, result) {
          console.log("Inserted form data <= 132");
      });
      test.save(async function() {
            console.log("user saved succesfully");
            res.render('main.ejs', {name});
          });
      }

});

//route that will handle returning users
app.post('/User-Returning/:name', async function(req, res) {
  const collection = client.db("excersiseapp").collection("test");

  //hold the username and password from the form
  let name = req.body.name;
  let password = req.body.password;

  console.log(name);
  console.log(password);

  const message = "";
  const nameToCheck = req.body.name;
  const passToCheck = req.body.password;

  const userCheck = await collection.findOne( { username: name } );

  //hold records of both username and password from the database
  const userNameCheck = userCheck.username;
  const userPass = userCheck.password;

  console.log(userNameCheck, "< username check");
  console.log(userPass, "< password check");


  if (userNameCheck == name) {
    if (userPass == password) {
      const noUserMessage = "";
      console.log("User Already Exists 145");
      const message = "";

      //Only for right now - Must implement test checker to see where they need to go
      res.redirect('/User-Returning/' + name);
      }
      else {
        const noUserMessage = "Username or password is incorrect";
        const message = '';
        res.render('home.ejs', {noUserMessage: noUserMessage, message: message});
      }
    }

    else {
      const noUserMessage = "Username or password is incorrect";
      const message = '';
      res.render('home.ejs', {noUserMessage: noUserMessage, message: message});
    }
});

app.get("/User-Returning/:name", async (req, res) => {
  let name = req.params.name;
  res.render('main', { name });
});



var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });
