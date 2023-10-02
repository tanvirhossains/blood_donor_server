
const express = require('express');

const bloodRequestRouter = express.Router();
const bloodRequestController = require('../../controllers/bloodRequest.controller');

//http://localhost:9000/api/v1/bloodRequest
bloodRequestRouter.route('')
    .get(bloodRequestController.getAllBloodRequest)
    .post(bloodRequestController.postBloodRequest)

module.exports = bloodRequestRouter;