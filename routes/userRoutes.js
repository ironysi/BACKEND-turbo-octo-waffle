const express = require("express");
const userModel = require('../models/user');

const bodyParser = require('body-parser');
const router = express.Router();
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
      console.error(err);
    }
    else{
      console.log("Server: /user/login: EMAIL: " + result.email + "\t PW: " + result.password)

      if(result.password === user.password){

        userModel.findOneAndUpdate({email: result.email}, {loggedin: true}, (error, res)=>{
          console.log("callback from find and update, error: " + error);
          console.log("callback from find and update, result: " + res);
        })
        res.json({
          "_id":result._id,
          "email": result.email,
          "name":result.name
          });
      }
    }
  });

  // login user
});


router.post("/logout", (req, res) => {
  // get user from database
  var user = {}
  user._id = req.body._id;

  userModel.findOneAndUpdate({_id: user._id},{loggedin: false}, (err, result) => {
    if(err) {
      console.error(err);
      res.sendStatus(403);
    }
    else{
      console.log("Server: /user/logout: " + result.name + " logged out");
      res.sendStatus(200);
    }
  });

  // logout user
});

module.exports = router;