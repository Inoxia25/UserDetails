const express=require("express");
const app=express();
const mongoose=require("mongoose");
mongoose.set("useFindAndModify", false);
var User=require("./model/userModel"); //importing our User model from userModel.js
//connecting to database
//new url-mongodb://Nandini:<password>@cluster0-shard-00-00.knzgk.mongodb.net:27017,cluster0-shard-00-01.knzgk.mongodb.net:27017,cluster0-shard-00-02.knzgk.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-n7zeo1-shard-0&authSource=admin&retryWrites=true&w=majority
//old url-mongodb+srv://Nandini:sne123@cluster0.knzgk.mongodb.net/my_db?retryWrites=true&w=majority
mongoose.connect("mongodb://Nandini:sne123@cluster0-shard-00-00.knzgk.mongodb.net:27017,cluster0-shard-00-01.knzgk.mongodb.net:27017,cluster0-shard-00-02.knzgk.mongodb.net:27017/my_db?ssl=true&replicaSet=atlas-n7zeo1-shard-0&authSource=admin&retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });
 //using routes 
const userRoutes=require("./routes/user");
//using body parser
const bodyParser=require("body-parser");
	app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

app.use("/user",userRoutes);//merging /user with all user routes

app.get("/",function(req,res){
	res.redirect("/user");
})
//listen route
app.listen( 3000, function() {
  console.log("Server started on port 3000");
});