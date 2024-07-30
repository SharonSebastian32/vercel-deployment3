// connections.js
const mongoose = require('mongoose');

const CONNECTION_URL = 'mongodb://localhost:27017/crudoprtnDB';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(CONNECTION_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;