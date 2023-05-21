const express = require('express');
const router = express.Router();
const tourController = require('../controller/tourController');

router.route(`/get-status`).get(tourController.aggregate);
router.route('/get-unwind').get(tourController.unwind);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.addNewTour); //multiple middleware ,chaining of middleware

module.exports = router;
