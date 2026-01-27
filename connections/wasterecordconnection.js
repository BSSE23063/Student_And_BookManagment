// connections/wasterecordconnection.js
const mongoose = require('mongoose');

const connectDB = async (localURI) => {
    try {
        // Vercel provides env vars, but we need to handle undefined
        const uri = process.env.MONGODB_URI || localURI;
        
        if (!uri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        
        console.log(`Connecting to MongoDB...`);
        
        // Vercel serverless optimized connection
        const connectionOptions = {
            serverSelectionTimeoutMS: 30000, // 30 seconds for cold starts
            socketTimeoutMS: 45000,
            maxPoolSize: 5,
            minPoolSize: 1,
            retryWrites: true,
            w: 'majority',
            // Critical for Vercel:
            connectTimeoutMS: 30000,
            heartbeatFrequencyMS: 10000,
            serverMonitoringMode: 'stream'
        };
        
        await mongoose.connect(uri, connectionOptions);
        
        console.log(`✅ MongoDB connected successfully`);
        console.log(`Database: ${mongoose.connection.db.databaseName}`);
        
        return mongoose.connection;
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        
        // Don't fallback on Vercel - show proper error
        if (process.env.VERCEL) {
            console.log('Running on Vercel - no local fallback available');
        }
        
        throw new Error(`Database connection failed: ${error.message}`);
    }
};

// Connection event handlers
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
});

// Handle process termination
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
});

module.exports = { connectDB };