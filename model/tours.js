// create a model and a schema out of it
const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'name must be there'],
      unique: true,
    },
    rating: {
      type: Number,
      default: 4,
    },
    price: {
      type: Number,
      require: [true, 'price must be there'],
    },
  },
  { collection: 'tours' }
);

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

