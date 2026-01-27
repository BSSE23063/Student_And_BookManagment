const mongoose = require('mongoose');

const studentRecordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    rollnumber: {
        type: String,
        required: [true, 'Roll number is required'],
        unique: true,
        trim: true
    },
    department: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    purchase: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'booksRecord'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const booksRecordSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    year: {
        type: String,
        required: [true, 'Year is required']
    },
    description: {
        type: String,
        default: ''
    },
    isbn: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: 'General'
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    copies: {
        type: Number,
        default: 1,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const studentRecord = mongoose.model('studentRecord', studentRecordSchema);
const booksRecord = mongoose.model('booksRecord', booksRecordSchema);

module.exports = { studentRecord, booksRecord };