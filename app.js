// Express  framework
const express = require ("express");
const res = require ("express/lib/response");
const app = express ();

// Mongo DB connect 
 const db = require("./server").db();
 const mongodb= require("mongodb");

// Kirish kodlari 
app.use(express.static("public"));
app.use(express.json());
app.use (express.urlencoded({extended:true}));

// Views Codes 
app.set ("views", "views");
app.set ("view engine","ejs");

// Ruterlar uchun ---Routng codes
app.post ("/create-item",(req,res)=>{
    console.log("user entered /create-item")
    console.log(req.body);
    const new_reja= req.body.reja;
    db.collection("plans").insertOne({reja:new_reja},(err,data)=>{
      res.json(data.ops[0]);

    });
});
app.post ("/delete-item", (req,res) =>{
     const id =req.body.id
     console.log("id:::", id)
     db.collection("plans").deleteOne({_id: new mongodb.ObjectId (id)}, 
     function(err,data){
        res.json({state:"success"});
     });
     
});

app.post ("/edit-item", (req,res)=> {
    const data = req.body;
    console.log(data);
    db.collection("plans").findOneAndUpdate(
        {_id: new mongodb.ObjectId(data.id)}, 
    { $set: {reja: data.new_input} },
    function (err,data){
        res.json ({state: "success"});
    });
    
});

app.post ("/delete-all", (req,res)=>{
    if (req.body.delete_all) {
        db.collection("plans").deleteMany(function(){
            res.json({state:"Hamma rejalar o'chirildi"})
        })
    }
})


app.get ("/", function (req,res){
    console.log("user entered /")
    db.collection ("plans")
    .find()
    .toArray((err,data)=> {
        if (err) {console.log(err);
        res.end("something went wrong");
    } else {
        
        res.render("reja", {items:data});
    }
    });
});

module.exports= app;