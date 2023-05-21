// create a model and a schema out of it
const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name must be provided.'],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price must be provided.'],
    },
    description: {
      type: String,
      required: [true, 'Description must be provided.'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Max group size must be provided.'],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Summary must be provided.'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [0, 'Ratings average cannot be negative.'],
      max: [5, 'Ratings average cannot be greater than 5.'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
      min: [0, 'Ratings quantity cannot be negative.'],
    },
    priceDiscount: {
      type: Number,
      default: 0,
      min: [0, 'Price discount cannot be negative.'],
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be either easy, medium, or difficult.',
      },
    },
    imageCover: {
      type: String,
      required: [true, 'Image cover must be provided.'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    startDates: [Date],
  },
  { collection: 'tours' }
);

const Tour = mongoose.model('Tour', tourSchema);

//document middleWare
tourSchema.pre('save', function (next) {
  console.log('before saving');
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});

//query middleware

tourSchema.pre('find', function (next) {
  //this point to query.
  this.time = Time();
  console.log('triggered before find ');
  next();
});

tourSchema.post('find', function (doc, next) {
  console.log(Time() - doc.time);
  next();
});

module.exports = Tour;
