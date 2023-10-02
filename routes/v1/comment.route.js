const express = require('express');

const commentsRouter = express.Router();
const commentsController = require('../../controllers/comment.controller')


commentsRouter.route('')
    .get(commentsController.getAllComments)
    .post(commentsController.addComment)

module.exports = commentsRouter;
