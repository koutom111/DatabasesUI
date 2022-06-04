const express = require('express');
const researcherController = require('../../controllers/controllers/editResearcher');
const executiveController = require("../../controllers/controllers/editExecutive");

const router = express.Router();

router.get('/', researcherController.getResearcher);
router.post('/editResearcher', researcherController.postResearcher);
router.post('/deleteResearcher', researcherController.postDeleteResearcher);
module.exports = router;