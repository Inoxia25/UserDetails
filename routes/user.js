const express=require("express");
const router=express.Router({mergeParams:true});
var User=require("../model/userModel");  //importing user model from userModel
//user ROUTES
//sending all user data
router.get("/", function(req,res){
	User.find({}, function(err,user)
			 {
		if(err) 
			res.send(err);
		else
			res.json(user);
	})
})
//creating new user data
router.post("/",sameNameOrNumber,function(req,res){
	   const name=req.body.name,
		   age=req.body.age,
		   gender=req.body.gender,
		   number=req.body.number,
		   location=req.body.location;
	//creating new object with all details
	const newUser={
		name:name,
		age:age,
		gender:gender,
		number:number,
		location:location
	}
		User.create(newUser,function(err,newlyCreatedUser){
		if(err)
		{res.send("Unable to create new user");}
		else
		{res.send(newlyCreatedUser); }
	});	
}) 
//showing same age group person details
router.get("/age/:userAge",function(req,res){
	//res.send("Reached");
	//finding users with same age
	User.find({age:req.params.userAge},function(err,foundUser){
		if(err)
			res.send("Error in finding users");
		else
			res.send(foundUser);
	})
})

//showing same gender group person details
router.get("/gender/:gender",function(req,res){
	//res.send("Reached");
	//finding users with same gender
	User.find({gender:req.params.gender},function(err,foundUser){
		if(err)
			res.send("Error in finding users");
		else
			res.send(foundUser);
	})
})
//route for giving same location person details
router.get("/location/:location",function(req,res){
	//finding users with same location
	User.find({location:req.params.location},function(err,foundUser){
		if(err) 
		{
			console.log(err);
			res.send("Error in finding user");
		}
		else
		res.json(foundUser);
	});
});
//finding a users details by his id mentioned in the database
router.get("/id/:id", function(req,res){
	//finding user with same id
	User.findById(req.params.id,function(err,foundUser){
			if(err)
			{
				console.log(err);
				res.send("Error in finding user with this id");
			}
			else
				res.send(foundUser);
		})
});
//update route for a specific persons details by his id
router.put("/id/:id/update",sameNameOrNumber,function(req,res){
	const name=req.body.name,
		   age=req.body.age,
		   gender=req.body.gender,
		   number=req.body.number,
		   location=req.body.location;
	//creating new object with all updated details
	let newUser={};
		if(name!=null)
		newUser.name=name;
	    if(age!=null)
		newUser.age=age;
	    if(gender!=null)
		newUser.gender=gender;
	    if(number!=null)
		newUser.number=number;
	    if(location!=null)
		newUser.location=location;
		
	//updating the users details
	User.findByIdAndUpdate(req.params.id,newUser,function(err,updatedUser){
		if(err) 
		{console.log(err);
		res.send("Error in updating the details");}
		else
	    res.redirect("/user");
	});
});
//middleware to check if user with same name or number exists
function sameNameOrNumber(req,res,next){
    //checking if same name
    User.find({name:req.body.name},function(err,sameName){
        if (err) console.log(err);
        else {
            if(sameName.length==0)
            {//if no user with same name exists, checking for user with same number
                User.find({number:req.body.number},function(err,sameNum){
                    if (err) console.log(err);
                    else {
                        if(sameNum.length==0)//if user with same number also does not exist
                          next();
                          else
                          res.send("User with same number exists.Create another user");
                    }
                })
            }
            else
            res.send("User with same name exists.Create another user");
            }
        })
}

module.exports=router; //exporting our router