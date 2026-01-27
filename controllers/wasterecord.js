const { studentRecord, booksRecord } = require("../models/wasterecord");

const addstudentRecord = async (req, res) => {
    try {
        const { name, email, rollnumber, department, phone, address } = req.body;

        // Basic validation
        if (!name || !email || !rollnumber) {
            return res.status(400).render("recordform", {
                error: "Name, Email, and Roll Number are required",
                formData: req.body
            });
        }

        // Check if email already exists
        const existingEmail = await studentRecord.findOne({ email });
        if (existingEmail) {
            return res.status(400).render("recordform", {
                error: "Email already exists",
                formData: req.body
            });
        }

        // Check if roll number already exists
        const existingRoll = await studentRecord.findOne({ rollnumber });
        if (existingRoll) {
            return res.status(400).render("recordform", {
                error: "Roll Number already exists",
                formData: req.body
            });
        }

        const newRecord = new studentRecord({
            name,
            email,
            rollnumber,
            department: department || '',
            phone: phone || '',
            address: address || ''
        });

        await newRecord.save();
        res.redirect("/record/view");
    } catch (error) {
        console.error("Error saving student record:", error);
        res.status(500).render("recordform", {
            error: "Something went wrong while saving the record.",
            formData: req.body
        });
    }
};

const getAllstudentRecords = async (req, res) => {
    try {
        const records = await studentRecord.find({}).sort({ createdAt: -1 });
        const books = await booksRecord.find({}).sort({ title: 1 });

        // Get recent students for the add student form
        const recentStudents = await studentRecord.find({})
            .sort({ createdAt: -1 })
            .limit(5);

        res.render("viewrecord", {
            records,
            books,
            recentStudents
        });
    } catch (error) {
        console.error("Error fetching records:", error);
        res.status(500).render("error", {
            message: "Unable to fetch student records."
        });
    }
};

const addbooksrecord = async (req, res) => {
    try {
        const { title, author, year, description, isbn, category, price, copies } = req.body;

        // Basic validation
        if (!title || !author || !year) {
            return res.status(400).render("booksrecord", {
                error: "Title, Author, and Year are required",
                formData: req.body
            });
        }

        const newRecord = new booksRecord({
            title,
            author,
            year,
            description: description || '',
            isbn: isbn || '',
            category: category || 'General',
            price: price || 0,
            copies: copies || 1
        });

        await newRecord.save();

        // Get recent books for display
        const recentBooks = await booksRecord.find({})
            .sort({ createdAt: -1 })
            .limit(3);

        res.render("booksrecord", {
            success: "Book added successfully!",
            recentBooks: recentBooks
        });
    } catch (error) {
        console.error("Error saving book record:", error);
        res.status(500).render("booksrecord", {
            error: "Something went wrong while saving the record.",
            formData: req.body
        });
    }
};

const purchasebook = async (req, res) => {
    try {
        const { rollnumber, bookId } = req.body;

        const book = await booksRecord.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        const student = await studentRecord.findOne({ rollnumber });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Check if book is already assigned to student
        if (student.purchase.includes(book._id)) {
            return res.status(400).json({
                success: false,
                message: "Book already assigned to this student"
            });
        }

        student.purchase.push(book._id);
        await student.save();

        res.json({
            success: true,
            message: "Book assigned successfully"
        });
    } catch (error) {
        console.error("Error assigning book:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while assigning the book."
        });
    }
};

const seeOrders = async (req, res) => {
    try {
        const students = await studentRecord.find({})
            .populate("purchase")
            .sort({ name: 1 });

        res.render("orders.ejs", {
            records: students
        });
    } catch (error) {
        console.error("Error fetching student or book records:", error);
        res.status(500).render("error", {
            message: "Something went wrong while retrieving the records."
        });
    }
};

const booksinfo = async (req, res) => {
    try {
        const { bookName, year } = req.query;
        const searchPerformed = !!(bookName || year);
        let info = null;
        let books = [];

        if (bookName) {
            info = await booksRecord.findOne({
                title: { $regex: bookName, $options: 'i' }
            });
        } else if (year) {
            info = await booksRecord.findOne({ year: year });
        } else {
            // Show all books when no search criteria
            books = await booksRecord.find({}).sort({ title: 1 });
        }

        res.render("booksinfo.ejs", {
            info: info,
            books: books,
            bookName: bookName,
            year: year,
            searchPerformed: searchPerformed
        });
    } catch (error) {
        console.error("Error fetching book info:", error);
        res.status(500).render("error", {
            message: "Error fetching book information"
        });
    }
};

module.exports = {
    addstudentRecord,
    getAllstudentRecords,
    addbooksrecord,
    purchasebook,
    seeOrders,
    booksinfo,
};