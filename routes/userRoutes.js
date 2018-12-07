const express = require("express");
const userModel = require('../models/user');

const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());

/**
 * user/login
 * Login user (if he exists in the database)
 */
router.post("/login", (req, res) => {
  if(req.body.email === "" || req.body.password === ""){
    res.sendStatus(403);
    console.log("POST /LOGIN : EMAIL" + req.body.email + " AND PASSWORD"+ req.body.password+" INVALID");
  } else {
    console.log("POST /LOGIN : EMAIL" + req.body.email + " AND PASSWORD"+ req.body.password+" VALID");

    userModel.findOne({email: req.body.email}, (error, result) => {

      if(error) {

        res.status(403).send("Something went wrong");

      } else if (result) {
        console.log("Server: /user/login: EMAIL: " + result);

        if(result.password == req.body.password){

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
      if(!res.headersSent){
        res.status(403).send("WRONG CREDENTIALS");
      }
    });
  }
});


/**
 * user/logout
 * Log user out of the account
 */
router.post("/logout", (req, res) => {
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
});


/**
 * user/create
 * check if user with this email exist, if not then create new one
 */
router.post("/create", (req, res) => {

  userModel.findOne({email: req.body.email}, (err, result) => {
    if(err){
      console.error(err);
    }
    else if(result) {
      console.log("User with this email already exist!!!")
      res.send("User with this email already exist!!!", 409)
    }
    else{
      userModel.create(req.body, (err, result) => {
        if(err) {
          console.error(err);
          res.sendStatus(403);
        }
        else{
          console.log("Server: /user/create: " + result.name + " created");
          res.sendStatus(200);
        }
      });
    }
  });



});


module.exports = router;