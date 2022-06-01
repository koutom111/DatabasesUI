const express = require('express');
const youngResearcherController = require('../../controllers/controllers/youngResearcher');

const router = express.Router();

router.get('/', youngResearcherController.getYoungResearcher);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;