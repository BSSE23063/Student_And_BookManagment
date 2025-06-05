const { studentRecord, booksRecord } = require("../models/wasterecord");

const addstudentRecord = async (req, res) => {
  try {
    const { name, email, rollnumber } = req.body;

    const newRecord = new studentRecord({
      name,
      email,
      rollnumber,
    });

    await newRecord.save();
    res.redirect("/record/view");
  } catch (error) {
    console.error("Error saving waste record:", error);
    res.status(500).send("Something went wrong while saving the record.");
  }
};

const getAllstudentRecords = async (req, res) => {
  try {
    const records = await studentRecord.find({});
    const books = await booksRecord.find({});
    res.render("viewrecord", { records, books });
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).send("Unable to fetch student records.");
  }
};

const addbooksrecord = async (req, res) => {
  try {
    const { title, author, year } = req.body;

    const newRecord = new booksRecord({
      title,
      author,
      year,
    });

    await newRecord.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error saving book record:", error);
    res.status(500).send("Something went wrong while saving the record.");
  }
};

const purchasebook = async (req, res) => {
  try {
    const { rollnumber, bookId } = req.body;

    const book = await booksRecord.findById(bookId);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    const student = await studentRecord.findOne({ rollnumber });
    if (!student) {
      return res.status(404).send("Student not found");
    }

    student.purchase.push(book._id);

    await student.save();

    res.redirect("/");
  } catch (error) {
    console.error("Error saving book record:", error);
    res.status(500).send("Something went wrong while saving the record.");
  }
};

const seeOrders = async (req, res) => {
  try {
    const students = await studentRecord.find({}).populate("purchase");

    res.render("orders.ejs", {
      records: students,
    });
  } catch (error) {
    console.error("Error fetching student or book records:", error);
    res.status(500).send("Something went wrong while retrieving the records.");
  }
};

module.exports = {
  addstudentRecord,
  getAllstudentRecords,
  addbooksrecord,
  purchasebook,
  seeOrders,
};
