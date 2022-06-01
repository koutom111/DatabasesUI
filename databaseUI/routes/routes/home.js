const express = require('express');
const homeController = require('../../controllers/controllers/home');

const router = express.Router();

router.get('/', homeController.getHome);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;