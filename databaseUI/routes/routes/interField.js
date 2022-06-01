const express = require('express');
const interFieldController = require('../../controllers/controllers/interField');

const router = express.Router();

router.get('/', interFieldController.getInterField);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;