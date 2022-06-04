const express = require('express');
const projectCRUDController = require('../../controllers/controllers/projectCRUD');

const router = express.Router();

router.get('/', projectCRUDController.getProjectCRUD);
router.get('/insert', projectCRUDController.getInsertPage);
router.post('/insert', projectCRUDController.postProject);
router.post('/delete/:id', projectCRUDController.postDeleteProject);
router.post('/edit', projectCRUDController.postEditProject);

module.exports = router;