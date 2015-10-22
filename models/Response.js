var mongoose = require("mongoose");

var ResponseSchema = new mongoose.Schema({
   postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
   body: {required: true, type: String},
   postedOn: Date,
   headline: {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
});

mongoose.model("Response", ResponseSchema);
