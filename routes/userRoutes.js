const express = require("express");
const userModel = require('../models/user');

const router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://admin:admin1@ds231133.mlab.com:31133/fullstack_db";

// CORS -> This is needed because front end is running different port than backend
router.use(cors({ origin: [
  "http://localhost{frontEndPort}"
],credentials: true }));

// Express session
router.use(session({
  secret: "This should have been secret...",
  resave: false,
  saveUninitialized: true
}));


const validatePayloadMiddleware = (req, res, next) => {
  if(req.body)
  {
    next();
  }
  else
  {
    req.status(403).send({errorMessage: "You need a payload"});
  }
} 


// Login
router.post("/login", validatePayloadMiddleware, (req, res) => {
  // get user from database
  user = userModel()

  MongoClient.connect(url, function(err, db) 
  {
    if (err) throw err;
    var dbo = db.db("mydb");

    dbo.collection("users").find({_id: req.params.id}, function(err, result) {
      if (err) throw err;

      console.log(result.name);
      user = result;

      db.close();
    });
  });

  // login user
  if(user && user.password === req.body.password)
  {
    const userWithoutPassword = {...user};
    delete userWithoutPassword.password;

    req.session.user = userWithoutPassword;
    res.status(200).send({
      user: userWithoutPassword
    });
  }
  else
  {
    res.status(403).send({
      errorMessage: "Permission denied"
    });
  }
});

// check if user is logged in
router.get("/login", (req, res) => {
  req.session.user ? req.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false})
});

// log out
router.post("/logout", (req, res) => {
  req.session.destroy((err) =>{
    if(err)
    {
      req.status(500).send("Could not log out");
    }
    else
    {
      req.status(200).send({});
    }
  });
});





router.get('', (req, res, next) => {

  console.log('GET: video lists');
  // Add Mongoose query to find all return list of students and return

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("fullstack_db");

    dbo.collection("videos").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);

      res.send(result)
      
      db.close();
    });
  });
  res.finished();
});

router.get('/:id', (req, res, next) => {

  console.log('GET: video by id:' + req.params.id);
  // Implement Mongoose query to find Student by Id return list of students and return

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");

    dbo.collection("videos").find({_id: req.params.id}, function(err, result) {
      if (err) throw err;
      console.log(result.name);

      res.send(result);

      db.close();
    });
  });

  res.finished();
})

router.put('/:id', (req, res, next) => {

  console.log('UPDATE: Customer by id: ' + req.params.id);

  // Implement Mongoose update Student by ID

})
router.post('/:id', (req, res, next) => {

  console.log('UPDATE: Customer by id: ' + req.params.id);

  // Implement Mongoose update Student by ID


})

router.delete('/:id', (req, res, next) => {

  console.log('UPDATE: Customer by id: ' + req.params.id);

  // Implement Mongoose delete one Student by ID

});

module.exports = router;
