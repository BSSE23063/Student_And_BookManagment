const express = require("express");
const routers = express.Router();

const {
    addstudentRecord,
    getAllstudentRecords,
    addbooksrecord,
    purchasebook,
    seeOrders,
    booksinfo,
} = require("../controllers/wasterecord");

// Student routes
routers.post("/", addstudentRecord);

// Note: The static route for "/record" is already handled in staticroutes.js
// This route shows the form and is accessed via GET /record

routers.get("/view", getAllstudentRecords);
routers.get("/order", seeOrders);

// Book routes
routers.post("/add", addbooksrecord);
routers.post("/purchase", purchasebook);
routers.get("/book-details", booksinfo);

// For viewing the book form (this should be in static routes but keeping for consistency)
routers.get("/", (req, res) => {
    res.render("booksrecord", { formData: {} });
});

module.exports = { routers };