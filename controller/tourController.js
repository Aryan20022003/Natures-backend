const Tour = require('./../model/tours');

const getAllTour = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    date: Date.now(),
    data: {},
  });
};

const getTour = (req, resp) => {
  console.log(req.params);
  resp.status(200).json({ req: req.params, date: Date.now() });
};

const updateTourById = (req, resp) => {
  resp.status(201).json({
    status: 'success',
    date: Date.now(),
    id: req.params.id,
    data: {
      tour: 'updated tour',
    },
  });
};

const deleteTourById = (req, resp) => {
  resp.status(400).json({
    status: 'success',
    date: Date.now(),
    id: req.params.id,
    data: null,
  });
};

const addNewTour = async (req, resp) => {
  try {
    const data = await Tour.create(req.body);
    resp.status(200).json({
      status: 'success',
      data: {
        tour: req.boyd,
      },
    });
  } catch (error) {
    resp.status(400).json({
      status: 'failed',
      error: req.boyd,
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
