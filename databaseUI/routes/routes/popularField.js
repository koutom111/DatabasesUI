const express = require('express');
const popularFieldController = require('../../controllers/controllers/popularField');

const router = express.Router();

router.get('/', popularFieldController.getPopularField);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;