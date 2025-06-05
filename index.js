const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());
const {Router}=require("./routes/staticroutes");
const {routers}=require("./routes/wasteroute");
const connect="mongodb://127.0.0.1:27017/studentrecord";
const {connectDB}=require("./connections/wasterecordconnection");
connectDB(connect);
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));


app.use("/",Router);
app.use("/record",routers);
app.use("/book",routers);                  

const port=5000;

app.listen(port,()=>{console.log("Server Started")});