const express = require('express');
const bestExecutivesController = require('../../controllers/controllers/bestExecutives');

const router = express.Router();

router.get('/', bestExecutivesController.getBestExecutives);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;