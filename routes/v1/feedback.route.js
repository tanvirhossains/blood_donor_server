const express = require('express');

const feedbackRouter = express.Router();
const feedbackController = require('../../controllers/feedback.controller');

feedbackRouter.route('')
    .get(feedbackController.getAllFeedback)
    .post(feedbackController.postAFeedback)

feedbackRouter.route('/:id')
    .get(feedbackController.getFeedbackById)
    .patch(feedbackController.patchFeedback)
    .put(feedbackController.patchFeedback);


module.exports = feedbackRouter;