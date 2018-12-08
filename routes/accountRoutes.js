const express = require("express");
const accountModel = require('../models/account');
const userModel = require('../models/user');

const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());


/**
 * check if user is logged in before executing any action
 */
function doIfLoggedIn(user_id, res, callback) {
  console.log("isLoggedIn(" + user_id + ")");
  if(user_id){
    userModel.findOne({_id: user_id}, (err, result) => {
    if(err){
      console.error(err);
      res.status(401);
      res.send();
      //check login
    }

    if(result.loggedin === true) {
      console.log("User is logged in!");
      callback(user_id);
    } else {
      res.status(401);
      res.send();
    }
  });
  } else {
    res.status(401);
    res.send();
  }
}

/**
 * account/getall
 * Returns all accounts for user that is logged in.
 */
router.get("/getall", (req, res) => {
  console.log("/getall: NEEDS REFACTOR");
  console.log("/account/getall: " + req.param("owner_id"));

  doIfLoggedIn(req.param("owner_id"), res, (id) => {
    accountModel.find({owner_id: id}, (accountError, accountResult) =>{
      if(accountResult) {
        // send accounts
        res.json(accountResult);
      } else {
        // no accounts to send
        res.json();
      }
    });
  });
});


/**
 * account/create
 * Create new account for user that is logged in
 */
router.post("/create", (req, res) => {
  console.log("/account/create: " + req.body.owner_id + " " + req.body.nickName);

  doIfLoggedIn(req.body.owner_id, res, (id) => {
    console.log("Creating..." + req.body.nickName);

    accountModel.create(req.body, (err, result) => {
      if(err){
        console.error("Error: " + err);
      }
      if (result) {
        console.log("Result: " + result);
        res.status(200);
        res.json(result);
      }
    }); // end of accountmodel.create
  }); // end of doIfLoggedIn + callback
}); // end of post(/create)

/**
 * account/update
 *  update user if he is logged in
 */
router.post("/update", (req, res) => {
  console.log("/account/update: " + req.body.owner_id + " " + req.body.nickName);

  doIfLoggedIn(req.body.owner_id, res, (id) => {
    console.log("Updating..." + req.body.nickName);

    accountModel.findByIdAndUpdate({_id: req.body._id}, req.body, (err, result) => {
      if(err){
        console.error("Error: " + err);
      } else {
        console.log("Result: " + result);
        res.status(200);
        res.send();
      }
    }); // end of accountmodel.create
  }); // end of doIfLoggedIn + callback
});


/**
 * account/delete
 * delete user if he is logged in
 */
router.post("/delete", (req, res) => {
  console.log("/account/delete: " + req.body.owner_id + " " + req.body.nickName);

  doIfLoggedIn(req.body.owner_id, res, (id) => {
    console.log("deleting..." + req.body.nickName);

    accountModel.findByIdAndDelete({_id: req.body._id}, (err, result) => {
      if(err){
        console.error("Error: " + err);
      }
      if (result) {
        console.log("Result: " + result);
        res.status(200);
        res.json(result);
      }
    }); // end of accountmodel.create
  }); // end of doIfLoggedIn + callback
});

module.exports = router;
