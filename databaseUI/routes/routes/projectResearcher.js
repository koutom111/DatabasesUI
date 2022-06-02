const express = require('express');
const projectResearcherController = require('../../controllers/controllers/projectResearcher');

const router = express.Router();

router.get('/', projectResearcherController.getProjectResearcher);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;