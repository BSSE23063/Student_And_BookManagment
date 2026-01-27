// connections/wasterecordconnection.js
const mongoose = require('mongoose');

const connectDB = async (localURI) => {
    try {
        // Use environment variable if available, otherwise use local URI
        const uri = process.env.MONGODB_URI ;
        
        console.log(`Attempting to connect to: ${uri.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB'}`);
        
        await mongoose.connect(uri, {
            // Remove deprecated options for newer mongoose versions
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log(`✅ MongoDB connected successfully`);
        console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
        return mongoose.connection;
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        
        // Only fallback if we were trying to connect to Atlas
        if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('mongodb+srv')) {
            console.log('Falling back to local database...');
            
            try {
                await mongoose.connect(localURI, {
                    serverSelectionTimeoutMS: 5000,
                });
                console.log('✅ Connected to local MongoDB as fallback');
                return mongoose.connection;
            } catch (localError) {
                console.error('❌ Local MongoDB also failed:', localError.message);
                throw new Error('Database connection failed completely');
            }
        } else {
            // If we were already trying local, just throw the error
            throw error;
        }
    }
};

module.exports = { connectDB };