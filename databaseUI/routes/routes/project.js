const express = require('express');
const projectController = require('../../controllers/controllers/project');

const router = express.Router();

router.get('/', projectController.getProject);

module.exports = router;