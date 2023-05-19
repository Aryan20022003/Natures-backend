const Tour = require('./../model/tours');

const getAllTour = async (req, resp) => {
  try {
    const data = await Tour.find();
    resp.status(201).json({
      status: 'success',
      data: {
        tour: data,
      },
    });
  } catch (err) {
    resp.status(400).json({
      status: 'failed',
    });
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
