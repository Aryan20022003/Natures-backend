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
    description: {
      type: String,
      require: [true, 'duration must have duration'],
    },
    maxGroupSize: {
      type: Number,
      require: [true, 'max group must have size'],
    },
    summary: {
      type: String,
      trim: true,
      require:[true,'must has summary']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    priceDiscount: {
      type: Number,
      default: 0,
    },
    difficulty:
    {
        type:String,
    },
    imageCover:
    {
        type:String,
        require:[true,"must have image Cover"]
    },
    images:[String],
    createdAt:
    {
        type:Date,
        default:Date.now()
    },
    startDates:[Date]
  },
  { collection: 'tours' }
);

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
