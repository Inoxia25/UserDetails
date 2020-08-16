const mongoose=require("mongoose");
//creating user schema
var userSchema=new mongoose.Schema({
	name:{
        type: String
        },
	age: String, 
	gender: String, 
	number: {
        type: String
        },
	location: String
    });
var User =mongoose.model("user",userSchema);
module.exports=User; //exporting our user model