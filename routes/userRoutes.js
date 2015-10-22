var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var passport = require("passport");

router.post("/register", function(req, res, next){
   var user = new User(req.body);
   user.setPassword(req.body.password);
   user.save(function(err, result){
      if(err) return next(err);
      if(!result) return next("There was an issue registering that user.");
      res.send(result.createToken());
   });
});

router.post("/login", function(req, res, next){
   passport.authenticate("local", function(err, user){
      // passport can figure out the username and password from the request
      if(err) return next(err);
      res.send(user.createToken()); // if user makes it this far with no issues, that means they have the right username and password
   })(req, res, next);
});

module.exports = router;


// LOGIN IN BEFORE PASSPORT
// router.post("/login", function(req, res, next){
//    var username = req.body.username.toLowerCase();
//    User.findOne({username: username}, function(err, user){
//       if(err) return next(err);
//       if(!user) return next("User" + req.body + "does not exist in the database.");
//       var correctPassword = user.checkPassword(req.body.password);
//       if(!correctPassword) return next("Incorrect username and password combination.");
//       res.send(user.createToken());
//    });
// });
