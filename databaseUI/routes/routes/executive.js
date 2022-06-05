const express = require('express');
const executiveController = require('../../controllers/controllers/executive');

const router = express.Router();

router.get('/', executiveController.getExecutive);
router.get('/insert', executiveController.getInsertPage);
router.post('/insert', executiveController.postExecutive);
router.post('/delete/:id', executiveController.postDeleteExecutive);
router.post('/edit', executiveController.postEditExecutive);
module.exports = router;