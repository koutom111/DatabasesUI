const express = require('express');
const researcherController = require('../../controllers/controllers/researcher');

const router = express.Router();

router.get('/', researcherController.getLanding);
router.get('/student-creation-page', researcherController.getCreateStudent)

module.exports = router;