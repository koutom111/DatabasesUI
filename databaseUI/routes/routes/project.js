const express = require('express');
const projectController = require('../../controllers/controllers/project');

const router = express.Router();

router.get('/', projectController.getProject);
router.get('/:id/researchersProj', projectController.getResearchers)
module.exports = router;