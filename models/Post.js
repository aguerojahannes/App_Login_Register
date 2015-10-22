var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
   type: String,
   headline: {required: true, type: String},
   body: {required: true, type: String},
   postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
   postedOn: Date,
   deletedOn: Date,
   image: String,
   tags: String,
   response: [{
      postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
      body: {required: true, type: String},
      postedOn: Date,
      rating: String
   }]
});

mongoose.model("Post", PostSchema);
