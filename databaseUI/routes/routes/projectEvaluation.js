const express = require('express');
const projectEvaluationController = require('../../controllers/controllers/projectEvaluation');

const router = express.Router();

router.get('/', projectEvaluationController.getProjectEvaluation);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;