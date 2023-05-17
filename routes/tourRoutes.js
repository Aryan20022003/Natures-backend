const express = require('express');
const router = express.Router();
const tourController = require('../controller/tourController');

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.addNewTour);

module.exports = router;
