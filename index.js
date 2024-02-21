const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const MongoUrl = "mongodb://127.0.0.1:27017/currins";
const Form = require("./models/form.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
require("dotenv").config();
const session = require('express-session');
const MongoStore = require('connect-mongo');

//Mongoose
main().then(() => {
    console.log("connected to DB")
}).catch((err) => {
    console.log(err)
})
async function main() {
    await mongoose.connect('mongodb+srv://EventPage:yapVDhPabbMLnzdY@cluster0.asmxswk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate); //for ejsMate
app.use(express.static(path.join(__dirname,"/public"))) // forn static files


//mongo session
const store = MongoStore.create({
    mongoUrl :'mongodb+srv://EventPage:yapVDhPabbMLnzdY@cluster0.asmxswk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    crypto: {
        secret:"secret0021",
    },
    touchAfter: 24*3600,
})
store.on("error",()=> {
    console.log("Error in mongo store", err)
})


app.get(("/home"), async (req,res) => {
   const currList = await Form.find({});
   res.render("currentInsights/index.ejs", {currList});
})
//new route
app.get("/home/new", (req,res) => {
    res.render("currentInsights/new.ejs")
})

//show route
app.get("/home/:id" , async(req,res) => {
    let {id} = req.params;
    const currins = await Form.findById(id);
    res.render("currentInsights/show.ejs" ,{currins})
})

//create route
app.post("/home", async (req,res) => {
    const newCurrIns = new Form(req.body.currins);
    await newCurrIns.save();
    res.redirect("/home");
})

//edit route
app.get("/home/:id/edit", async (req,res) => {
    let {id} = req.params;
    const currins = await Form.findById(id);
    res.render("currentInsights/edit.ejs", {currins})
})

// update route
app.put("/home/:id", async(req,res) => {
    let {id} = req.params;
    await Form.findByIdAndUpdate(id, {...req.body.currins});
    res.redirect(`/home/${id}`)
})

//delete route
app.delete("/home/:id", async(req,res) => {
    let {id} = req.params;
    let deletedins = await Form.findByIdAndDelete(id);
    console.log("deleted")
    res.redirect("/home")
})

app.get("/", async(req,res) => {
    const currList = await Form.find({})
    res.render("currentInsights/index.ejs", {currList})
})

app.listen(3000, ()=> {
    console.log("server listening on 8080")
})