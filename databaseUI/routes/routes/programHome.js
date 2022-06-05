const express = require('express');
const programHomeController = require('../../controllers/controllers/program');

const router = express.Router();

router.get('/', programHomeController.getProgramHome);
module.exports = router;