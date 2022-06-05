const express = require('express');
const popularFieldController = require('../../controllers/controllers/popularField');
const projectCRUDController = require("../../controllers/controllers/projectCRUD");

const router = express.Router();

router.get('/', popularFieldController.getPopularField);

module.exports = router;