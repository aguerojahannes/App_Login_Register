var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
// using Authorization now:
var jwt = require("express-jwt");
var auth = jwt({
   userProperty: "payload", // on the request object itself, this is where we're going to put the userProperty, on the payload
   secret: "ThisisASecretCode"
});

// POST NEW POST - http POST to /api/post/
router.post("/", function(req, res, next){
   var post = new Post(req.body);
   // post.postedBy = req.payload._id; // we have need to be utilizing the jsontoken already. we might be..?
   post.postedOn = new Date();
   post.deletedOn = null;
   post.save(function(err, result){
      if(err) return next(err);
      if(!result) return next("Could not create the object. Please check all fields.");
      res.send(result);
   });
});

// GET ALL POSTS - http GET to /api/post
router.get("/", function(req, res, next){
   Post.find({}).exec(function(err, result){ // often we have other functions after find, so .exec sets us up to fill in other things (like .populate, .limit, etc)
         if(err) return next(err);
         res.send(result);
   });
});

// router.param("id", function(req, res, next, id){
//    Post.findOne({_id: id}, function(err, result){
//       if (err) return next(err);
//       if(!result) return next("Could not find post with an id of: " + id);
//       req.post = result;
//       next();
//    });
// });

// TO DO A GET POST BY ID WITH PARAM ID
// router.get("/:id", function(req, res, next){
      // res.send(req.post); // we already did this search for id and set the result equal to req.post, so we're sending that back here.
//    });
// });

// GET POST BY ID - http GET to /api/post/:id
router.get("/:id", function(req, res, next){
   Post.findOne({_id: req.params.id}, function(err, result){ // anywhere where it's true in the database that _id is the same as what we're sending in from factory, in this case we sent in the id as a parameter ("/api/post/" + id) on the request.
      if(err) return next(err);
      console.log("From the Routes.");
      res.send(result); // we are not using our router.param so we do this search here and send the result
   });
});

// PUT EDITTED POST - http PUT to /api/post
// router.put("/", function(req, res, next){
//    Post.update({_id: req.body.IDofPostToEdit})
//    console.log(req.body);
//    res.send(result);
// });

// DELETE POST BY ID - http DELETE to /api/post
router.delete("/:id", function(req, res, next){
   Post.remove({_id: req.params.id}, function(err, result){ // anywhere where it's true in the database that _id is the same as what we're sending in from factory, in this case we sent in the id as a parameter ("/api/post/" + id) on the request.
      if(err) return next(err);
      console.log(result);
      res.send();
   });
});

router.post("/:id/response", auth, function(req, res, next){
   var response = {
      postedBy: req.payload._id,
      body: req.body.body,
      postedOn: Date,
      rating: req.body.rating
   };
   Post.findOne({_id: req.params.id}, function(err,post){
      if(err) return next(err);
      console.log("From the Routes.")
      if(!post) return next("Could not find that post.");
      post.response.push(response);
      post.save(function(err, result){
         res.send(result);
      });
   });
});

module.exports = router;
