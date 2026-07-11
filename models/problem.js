const mongoose = require("mongoose");

const exampleSchema = mongoose.Schema({
    input: String,
    output: String,
    explanation: String
}, {_id:false});

const problemSchema=mongoose.Schema({
    heading:{type:String,required:true},
    slug:{type:String,required:true,unique:true},
    difficulty:{type:String,enum:["easy","medium","hard"],required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    examples:[exampleSchema],
    constraints:[String],
    createdAt:{type:Date,default:Date.now}
});

module.exports=mongoose.model("Problem",problemSchema);