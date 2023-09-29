// Express  framework
const express = require ("express");
const res = require ("express/lib/response");
const app = express ();

// Mongo DB connect 
 const db = require("./server").db();

// Kirish kodlari 
app.use(express.static("public"));
app.use(express.json());
app.use (express.urlencoded({extended:true}));

// Views Codes 
app.set ("views", "views");
app.set ("view engine","ejs");

// Ruterlar uchun ---Routng codes

app.post("/create-item", (req,res)=>{
    console.log (req.body);
    res.json({test: "sucess"});
})

app.get ("/", function (req,res){
    res.render("reja");
});

module.exports= app;