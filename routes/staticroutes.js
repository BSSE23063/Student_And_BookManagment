const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.render("home");
});

Router.get("/record", (req, res) => {
    res.render("recordform", { formData: {} });
});

Router.get("/addbook", (req, res) => {
    res.render("booksrecord", { formData: {} });
});

Router.get("/info", (req, res) => {
    res.render("booksinfo", { info: null, books: [], searchPerformed: false });
});

module.exports = { Router };