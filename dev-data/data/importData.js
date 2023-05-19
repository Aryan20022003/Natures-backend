require('dotenv').config();
const mongoose = require('mongoose');
const Tour = require('./../../model/tours');
const fs = require('fs');

const DB = process.env.DB.replace('<PASSWORD>', process.env.PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Natures',
  })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const deleteFile = async () => {
  try {
    await Tour.deleteMany();
    console.log('All data is deleted');
  } catch (error) {
    console.log('Error occurred:', error);
  } finally {
    process.exit();
  }
};

const addFile = async () => {
  try {
    await Tour.create(data);
    console.log('Data is imported');
  } catch (error) {
    console.log('Error occurred:', error);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--delete') {
  deleteFile();
}
if (process.argv[2] === '--import') {
  addFile();
}
