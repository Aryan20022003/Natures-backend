const { json } = require('express');
const Tour = require('./../model/tours');

class API {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  find() {
    const { difficulty } = this.queryString;
    console.log({ difficulty });
    // Extract the 'difficulty' parameter from the query string
    if (difficulty) {
      this.query = this.query.find({ difficulty });
    }
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      console.log(this.queryString.sort);

      let sortBy = JSON.stringify(this.queryString.sort).split(',').join(' ');

      sortBy = JSON.parse(sortBy);

      this.query = this.query.sort(sortBy);
      return this;
    }
  }
  fieldRequested() {
    //3 returning only those field requested by user
    if (this.queryString.select) {
      console.log(this.queryString.select);
      let toSelect = this.queryString.select.split(',').join(' ');
      this.query = this.query.select(toSelect);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  async paging() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;

    data = data.limit(limit).skip((page - 1) * limit);

    const totalDataCount = await this.query.countDocuments();
    if ((page - 1) * limit >= totalDataCount) {
      throw new Error('Invalid page number');
    }
  }
}

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

    const data = await( new API(Tour.find(), req.query)
      .find()
      .fieldRequested()
      .paging()
      .sorting()).query;
    // data = await data;

    // Await the execution of the 'data' query

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

module.exports = {
  getAllTour,
  getTour,
  updateTourById,
  deleteTourById,
  addNewTour,
};
