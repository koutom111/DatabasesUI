const express = require('express');
const projectController = require('../../controllers/controllers/project.js');

const router = express.Router();

router.get('/', projectController.getProject);
router.post('/create', projectController.postProject);
router.post('/update/:id', projectController.postUpdateProject);

module.exports = router;