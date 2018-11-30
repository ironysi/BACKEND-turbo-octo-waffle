const express = require("express");
const userModel = require('../models/user');
const bodyParser = require('body-parser');

const router = express.Router();

var url = "mongodb://admin:admin1@ds231133.mlab.com:31133/fullstack_db";

router.use(bodyParser.json());

// Login
router.post("/login", (req, res) => {
  // get user from database
  var user = {}
  user.email = req.body.email;
  user.password = req.body.password;

  userModel.findOne({email: user.email}, (err, result) => {
    if(err) {    
      res.sendStatus(403)
      throw err;
    }
    else{
      console.log("Server: /user/login: EMAIL: " + result.email + "\t PW: " + result.password)

      if(result.password === user.password){
        res.json(result)
      }
    }
  } );
  
  
  // login user
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