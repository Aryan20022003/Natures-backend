const { json } = require('express');
const Tour = require('./../model/tours');

const getAllTour = async (req, resp) => {
  try {
    const { difficulty } = req.query;
    console.log({ difficulty });
    // Extract the 'difficulty' parameter from the query string

    let data = Tour.find({ difficulty });
    // Filter the data based on the 'difficulty' parameter

    // Sorting
    if (req.query.sort) {
      console.log(req.query.sort);
      // Extract the 'sort' parameter from the query string

      let sortBy = JSON.stringify(req.query.sort).split(',').join(' ');
      // Convert the 'sort' parameter to a string, replace commas with spaces
      // Example: "price,rating" => "price rating"

      sortBy = JSON.parse(sortBy);
      // Parse the string back to an object
      // Example: "price rating" => { price: 1, rating: -1 }

      data = data.sort(sortBy);
      // Apply sorting based on the 'sortBy' object
    }

    data = await data;
    // Await the execution of the 'data' query

    resp.status(201).json({
      status: 'success',
      data: {
        tour: data,
      },
    });
    // Send a JSON response with the sorted and filtered 'data'
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

module.exports = {
  getAllTour,
  getTour,
  updateTourById,
  deleteTourById,
  addNewTour,
};
