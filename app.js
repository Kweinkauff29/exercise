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
  console.log(req.body);
  console.log(res.body);

  res.render('home.ejs', {message});
});

const hostname = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');

const server = http.createServer(app);

const message = "";


app.get('/', (req, res) => {
  const message = "";
  console.log(this);
  res.render('home.ejs', {message});

});

app.get('/main/:name', async (req, res) => {
  let name = await req.params.name;
  console.log(name);
  //console.log(collection);

  let test = newUser({
    username: req.body.name,
    password: req.body.password,
    email: req.body.email,
    weight: req.body.weight
  })

  //var name = req.params.name;

  console.log(req);

  const options = { wtimeout: 10000 };


  //check to see if user already Exists
  const userCheck = await newUser.find( { username: req.body.name } );

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
  console.log(req, "<= req");
});

//route that will handle returning users
app.post('/main/:name', async function(req, res) {
  const collection = client.db("excersiseapp").collection("excersiseapp1");

  //console.log(collection);

  let test = newUser({
    username: req.body.name,
    password: req.body.password,
    email: req.body.email,
    weight: req.body.weight
  })

  var name = req.body.name;

  console.log(req);

  const options = { wtimeout: 10000 };


  //check to see if user already Exists
  const userCheck = await newUser.find( { username: req.body.name } );

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



server.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
