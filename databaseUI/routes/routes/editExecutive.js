const express = require('express');
const executiveController = require('../../controllers/controllers/editExecutive');

const router = express.Router();

router.get('/', executiveController.getExecutive);
router.post('/editExecutive', executiveController.postExecutive);
router.post('/deleteExecutive', executiveController.postDeleteExecutive);
module.exports = router;
