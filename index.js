var mongoose=require("mongoose");
const express=require("express");
const app=express()
const path=require("path")
const port=process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect("mongodb+srv://user-sd:Saksham4672@cluster0.d28bj.mongodb.net/project?retryWrites=true&w=majority").then(()=>{
  console.log("Connected to mongdb!")
}).catch((err)=>{
  console.log("not connected to mongodb!")
})

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: "This field is required.",
  },
  lastname: {
    type: String,
  },
});

var User= mongoose.model("User", userSchema);


app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"index.html"))
})

app.post("/",(req,res)=>{
 var user=new User();
 user.firstname = req.body.firstname;
 user.lastname = req.body.lastname;
 user.save();
 res.send(user);
 res.redirect("/");
})
 

app.listen(port,(req,res)=>{
   console.log("connected to server!")
})