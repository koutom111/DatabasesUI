const express = require('express');
const projectController = require('../../controllers/controllers/project');

const router = express.Router();

router.get('/', projectController.getProject);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;