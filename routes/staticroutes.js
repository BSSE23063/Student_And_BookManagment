const express= require("express");
const Router=express.Router();

Router.get("/",(req,res)=>{
    res.render("home");
})

Router.get("/record",(req,res)=>{
    res.render("recordform");
})

Router.get("/view",(req,res)=>{
    res.render("viewrecord");
})

Router.get("/addbook",(req,res)=>{
    res.render("booksrecord");
})

module.exports={Router};