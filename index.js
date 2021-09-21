var mysql = require('mysql')
const express=require("express");
const app=express()
const path=require("path")
const port=process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,"static")))
app.use(express.urlencoded({extended: true}));
app.use(express.json());



var connection = mysql.createConnection({
  host: 'localhost',
  user: 'techwith_saksham',
  password: 'Saksham@4672',
  database: 'techwith_sakshamdatabase'
})

connection.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"index.html"))
})

app.post("/save.html",(req,res)=>{
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;

  var sql="insert into saksham2 values('"+firstname+"','"+lastname+"')"
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    console.log(sql);
    res.redirect('/');
  });

})

app.listen(port,(req,res)=>{
   console.log("connected to server!")
})