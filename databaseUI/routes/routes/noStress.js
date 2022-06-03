const express = require('express');
const noStressController = require('../../controllers/controllers/noStress');

const router = express.Router();

router.get('/', noStressController.getNoStress);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;