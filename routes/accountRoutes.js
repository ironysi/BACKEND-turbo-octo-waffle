const express = require("express");
const accountModel = require('../models/account');
const userModel = require('../models/user');

const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());


router.get("/getall", (req, res) => {
  console.log("/getall: NEEDS REFACTOR");
  console.log("/account/getall: " + req.body.owner_id);
  if(isLoggedIn(req.body.owner_id)){
    accountModel.find({owner_id: req.body.owner_id}, (accountError, accountResult) =>{
      if(accountResult) {
        // send accounts
        res.json(accountResult);
      } else {
        // no accounts to send
        res.json();
      }
    })
  } else {
    // unauthorized
    res.status(401);
    res.send();
  }
});

router.post("/create", (req, res) => {
  console.log("/account/create: " + req.body.owner_id + " " + req.body.nickName);


  doIfLoggedIn(req.body.owner_id, (loggedIn) => {
    if(loggedIn){
      console.log("Creating..." + req.body.nickName);

      accountModel.create(req.body, (err, result) => {
        if(err){
          console.error("Error: " + err);
        } else {
          console.log("Result: " + result);
          res.status(200);
          res.send();
        }
      });

    } else {
      res.status(401);
      res.send();
    }
  });

});

function doIfLoggedIn(user_id, callback) {
  console.log("isLoggedIn(" + user_id + ")");
  let loggedin;
  userModel.findOne({_id: user_id}, (err, result) => {
    if(err){
      console.error(err);
      loggedin = false;
      //check login
    } else if (result.loggedin === true) {
      console.log("User is logged in!");
      loggedin = true;
    }

    callback(loggedin);

  });
}

module.exports = router;
