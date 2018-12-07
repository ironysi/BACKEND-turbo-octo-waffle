const express = require("express");
const userModel = require('../models/user');
const accountModel = require("../models/account");

const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());


function doIfLoggedIn(adminCode, res, callback) {
  if(adminCode === "1234"){
    callback();
  } else {
    res.status(401);
    res.send();
  }
}

/**
 * admin/getallusers
 * Return all existing users.
 */
router.get("/getallusers", (req, res) => {
  
  doIfLoggedIn(req.param("adminCode"), res, () => {
    userModel.find((err, result) =>{
      if(result) {
        // send users
        console.log("")
        res.json(result);
      } else {  
        // no users to send
        res.json();
      }
    });
  });
});


/**
 * admin/deleteuser
 * deletes user
 */
router.post("/deleteuser", (req, res) => {

  userModel.findByIdAndDelete({_id: req.body._id}, (err, result) => {
    if(err){
      console.error(err);
    }
    else if(result) {
      console.log("User with id: "+ result._id +" got deleted");
      res.send("User with id: "+ result._id +" got deleted", 200);

      accountModel.deleteMany({owner_id: result._id}, (err) =>{
        if(err){
          console.error(err);
        }
        else{
          console.log("deleted all accounts for user: " + result.name)
        }
      });
    }
    else{
      console.log("User with this id does not exist!!!");
      res.send("User with this id does not exist!!!", 404);
    }
  });
});


module.exports = router;