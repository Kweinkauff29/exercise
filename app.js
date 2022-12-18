const http = require('http');
const ejs = require('ejs');
const express = require('express');
const app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://zetterburg40:Goalie29@cluster0.xbmwh.mongodb.net/matrix-test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  // Use the client object to perform operations on the database
  client.close();
});

var Schema = mongoose.Schema;

var newUser = mongoose.model('excersiseapp', new Schema({
  username: String,
  email: String,
  password: String,
  currentWeight: String
}, { collection: "excersiseapp" }, { versionKey: false } ));

app.get("/", async function (req, res) {
  console.log(req.params);
  console.log(res.params);

  res.render('home.ejs');
});

//route that will handle returning users
app.post('/main/:username', function(req, res) {
  const collection = client.db("excersiseapp").collection("excersiseapp");

  let user = newUser({
    username: req.body.name,
    password: req.body.password,
    email: req.body.email,
    weight: req.body.Email
  })

  collection.insertOne(newUser, function(err, result) {
    console.log("Inserted form data");
});

res.redirect('/main');

});

const hostname = '127.0.0.1';
const port = 3000;

app.set('view engine', 'ejs');

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.render('home.ejs');
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}/`);
});