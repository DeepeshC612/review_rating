const bodyparser = require('body-parser')
const express = require('express')
const res = require('express/lib/response')
const { compileETag } = require('express/lib/utils')
const app = express()
const port = 5000
const mongoose = require("mongoose");

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


mongoose.set('strictQuery', false);

mongoose.connect("mongodb://127.0.0.1:27017/DemoDB",{
 useNewUrlParser:"true",
});

mongoose.connection.on("error",(err)=>{
    console.log("mongoose Connection Error", err);
});

mongoose.connection.on("connected",(err,res)=>{
    console.log("mongoose is connected");
});


app.get("/", function(req,res){
    return res.send({msg: "Welcome in Node js Web app Development."})
})

app.get("/detail", function(req,res){
    res.send(
        {
            msg : "Hey this is detail page"
        }
        )
})

app.post("/signup", function(req,res){
    console.log(req.body);
    const {name,email} = req.body
    console.log(name,email);
    res.send(
        {
            msg : "none"
        }
    )
})

app.put("/login", function(req,res){
    res.send(
        {
            msg: "This is login page"
        }
    )
})

app.patch("/patch", function(req,res){
    res.send(
        {
            msg: "This is patch page"
        }
    )
})

app.delete("/delete", function(req,res){
    res.send(
        {
            msg: "This is delete page"
        }
    )
})

app.listen(port, ()=>{
    console.log(`Server is running port no:${port}`);
})