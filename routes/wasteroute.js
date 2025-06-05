const express = require("express");
const routers = express.Router();

const {
  addstudentRecord,
  getAllstudentRecords,
  addbooksrecord,
  purchasebook,
  seeOrders,
} = require("../controllers/wasterecord");

routers.post("/", addstudentRecord);
routers.get("/", (req, res) => {
  res.render("recordform");
});

routers.get("/view", getAllstudentRecords);
routers.post("/add", addbooksrecord);
routers.post("/purchase", purchasebook);
routers.get("/order", seeOrders);

module.exports = { routers };
