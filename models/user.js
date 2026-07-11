const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{type:String,unique:true,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    points:{type:Number,default:0},
    createdAt:{type:Date,default:Date.now()}
});

module.exports=mongoose.model("User",userSchema);