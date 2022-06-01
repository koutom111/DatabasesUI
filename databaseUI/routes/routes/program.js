const express = require('express');
const programController = require('../../controllers/controllers/program');

const router = express.Router();

router.get('/', programController.getProgram);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;