const express = require('express');
const youngReasercherController = require('../../controllers/controllers/youngReasercher');

const router = express.Router();

router.get('/', youngReasercherController.getYoungReasercher);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;