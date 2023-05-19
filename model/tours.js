// create a model and a schema out of it
const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'name must be there'],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      require: [true, 'price must be there'],
    },
    duration: {
      type: Number,
      require: [true, 'duration must have duration'],
    },
    maxGroup: {
      type: Number,
      require: [true, 'max group must have size'],
    },
    summary: {
      type: String,
      trim: true,
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    priceDiscount: {
      type: Number,
      default: 0,
    },
  },
  { collection: 'tours' }
);

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
