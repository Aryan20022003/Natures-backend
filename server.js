require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

//connection to mongo DB atlas
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
    console.error('Error connecting to MongoDB:', error.message);
  });

// const testTour = new Tour({
//   name: 'Forest trek',
//   rating: 4.7,
//   price: 500,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const port = process.env.Port;

app.listen(port, () => {
  console.log('Server is running');
});
