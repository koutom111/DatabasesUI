const express = require('express');
const programController = require('../../controllers/controllers/program');
const executiveController = require("../../controllers/controllers/editExecutive");

const router = express.Router();

router.get('/', programController.getProgram);
router.post('/editProgram', programController.postProgram);
router.post('/deleteProgram', programController.postDeleteProgram);
module.exports = router;