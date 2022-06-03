//unfinished

const express = require('express');
const personController = require('../../controllers/controllers/person');

const router = express.Router();

router.get('/', personController.getPerson);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;