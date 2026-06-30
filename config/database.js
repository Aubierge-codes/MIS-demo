const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('app:database');

const connectDB = async () => {
  try {
    // 1. Prioritize the .env variable, then config, then local fallback
    const dbURI = process.env.MONGODB_URI || (config.has('mongodb.uri') ? config.get('mongodb.uri') : 'mongodb://localhost:27017/school-mis');
    
    // 2. Options are no longer needed in Mongoose 6+ / Node Driver 4+
    await mongoose.connect(dbURI);
    
    // 3. This will show up in your terminal to confirm success
    console.log(`✅ MongoDB Connected to: ${dbURI.split('@')[1] || dbURI}`); 
    debug(`MongoDB Connected: ${dbURI}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  debug('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  debug('MongoDB error:', error);
});

module.exports = connectDB;

