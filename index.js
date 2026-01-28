const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Database connection
const connect = "mongodb://127.0.0.1:27017/studentDB";
const { connectDB } = require("./connections/wasterecordconnection");

// Initialize database connection
connectDB(connect).then(() => {
    console.log('Database initialized');
}).catch(err => {
    console.error('Failed to initialize database:', err);
});

// Routes
const { Router } = require("./routes/staticroutes");
const { routers } = require("./routes/wasteroute");

app.use("/", Router);
app.use("/record", routers);
app.use("/book", routers);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', { 
        message: 'Page not found' 
    });
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});

const port = process.env.PORT || 5000;
app.listen(port, () => { 
    console.log(`🚀 Server started on port ${port}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 URL: http://localhost:${port}`);
});

module.exports = app;