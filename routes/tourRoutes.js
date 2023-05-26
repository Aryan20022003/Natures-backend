const express = require('express');
const router = express.Router();
const tourController = require('../controller/tourController');
const authController = require('./../controller/authController');

router.route(`/get-status`).get(tourController.aggregate);
router.route('/get-unwind').get(tourController.unwind);
router
  .route('/:id')
  .get(authController.tokenVerification, tourController.getTour)
  .patch(authController.tokenVerification, tourController.updateTourById)
  .delete(authController.tokenVerification, tourController.deleteTourById);

router
  .route('/')
  .get(authController.tokenVerification, tourController.getAllTour)
  .post(authController.tokenVerification, tourController.addNewTour); //multiple middleware ,chaining of middleware

module.exports = router;
