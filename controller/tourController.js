const { json } = require('express');
const Tour = require('./../model/tours');
const API = require('./../utility/apiFeatures');

const getAllTour = async (req, resp) => {
  try {
    // const { difficulty } = req.query;
    // console.log({ difficulty });
    // // Extract the 'difficulty' parameter from the query string

    // //1->find method
    // let data=Tour.find();
    // if (difficulty) {
    //   data = Tour.find({ difficulty });
    // }

    // Filter the data based on the 'difficulty' parameter

    // 2 Sorting
    // if (req.query.sort) {
    //   console.log(req.query.sort);
    //   // Extract the 'sort' parameter from the query string

    //   let sortBy = JSON.stringify(req.query.sort).split(',').join(' ');
    //   // Convert the 'sort' parameter to a string, replace commas with spaces
    //   // Example: "price,rating" => "price rating"

    //   sortBy = JSON.parse(sortBy);
    //   // Parse the string back to an object
    //   // Example: "price rating" => { price: 1, rating: -1 }

    //   data = data.sort(sortBy);
    //   // Apply sorting based on the 'sortBy' object
    // }

    //3 returning only those field requested by user
    // if (req.query.select) {
    //   console.log(req.query.select);
    //   let toSelect = req.query.select.split(',').join(' ');
    //   data.select(toSelect);
    // } else {
    //   data.select('-__v');
    // }
    //4 paging and limit
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;

    // data = data.limit(limit).skip((page - 1) * limit);

    // const totalDataCount = await Tour.countDocuments();
    // if ((page - 1) * limit >= totalDataCount) {
    //   throw new Error('Invalid page number');
    // }
    // data = await data; just awating after building all the methods query .
    const data = await new API(Tour.find(), req.query)
      .find()
      .fieldRequested()
      .sorting()
      .paging().query;

    resp.status(201).json({
      status: 'success',
      data: {
        tour: data,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: 'failed',
      error: err.message,
    });
    // Handle any errors that occur during the process
  }
};

const getTour = async (req, resp) => {
  try {
    const data = await Tour.findById(req.params.id);
    resp.status(201).json({
      status: 'success',
      data: {
        tour: data,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: 'failed',
      id: req.params.id,
      error: err,
    });
  }
};

const updateTourById = async (req, resp) => {
  try {
    const data = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    resp.status(200).json({
      status: 'success',
      data: req.body,
    });
  } catch (error) {
    resp.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const deleteTourById = async (req, resp) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    resp.status(200).json({
      status: 'successful',
      data: null,
    });
  } catch (err) {
    resp.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const addNewTour = async (req, resp) => {
  try {
    const data = await Tour.create(req.body);
    resp.status(200).json({
      status: 'success',
      data: {
        tour: req.body,
      },
    });
  } catch (error) {
    resp.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};

const aggregate = async (req, resp) => {
  try {
    const data = await Tour.aggregate([
      { $match: { ratingsAverage: { $gt: 4 } } },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          averagePrice: { $avg: '$price' },
          averageRating: { $avg: '$ratingsAverage' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
          noOfRating: { $sum: '$ratingsQuantity' },
          noOfTours: { $sum: 1 },
        },
      },
      {
        $sort: {
          averageRating: -1,
        },
      },
    ]);

    resp.status(200).json({
      status: 'success',
      data: {
        tour: data,
      },
    });
  } catch (error) {
    resp.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};

const unwind = async (req, resp) => {
  const data = await Tour.aggregate([
    { $unwind: '$startDates' },
    {
      $match: {
        startDates: { $gte: new Date('2022-02-01') },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        tour: { $push: '$name' },
        numberOfTours: { $sum: 1 },
      },
    },
    {
      $addFields: {
        month: '$_id',
      },
    },
    {
      $sort: {
        numberOfTours: -1,
      },
    },
  ]);
  try {
    resp.status(200).json({
      status: 'success',
      data: {
        tour: data,
      },
    });
  } catch (error) {
    resp.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
module.exports = {
  getAllTour,
  getTour,
  updateTourById,
  deleteTourById,
  addNewTour,
  aggregate,
  unwind,
};
