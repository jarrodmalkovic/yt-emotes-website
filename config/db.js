const mongoose = require('mongoose');
const dotenv = require('dotenv').config({ path: './config.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.NODE_ENV,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected...`);
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;
