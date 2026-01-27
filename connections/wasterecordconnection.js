// connections/wasterecordconnection.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async (localURI) => {
    try {
        // Use environment variable if available, otherwise use local URI
        const uri = process.env.MONGODB_URI || localURI;
        
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log(`MongoDB connected: ${uri.includes('mongodb+srv') ? 'Cloud (Atlas)' : 'Local'}`);
        return mongoose.connection;
        
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.log('Falling back to local database...');
        
        // Try local database as fallback
        if (uri !== localURI) {
            try {
                await mongoose.connect(localURI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
                console.log('Connected to local MongoDB as fallback');
                return mongoose.connection;
            } catch (localError) {
                console.error('Local MongoDB also failed:', localError.message);
                throw new Error('Database connection failed');
            }
        } else {
            throw error;
        }
    }
};

module.exports = { connectDB };