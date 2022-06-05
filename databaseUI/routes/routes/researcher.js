const express = require('express');
const researcherController = require('../../controllers/controllers/researcher');

const router = express.Router();


router.get('/', researcherController.getResearcher);
router.get('/insert', researcherController.getInsertPage);
router.post('/insert', researcherController.postResearcher);
router.post('/delete/:id', researcherController.postDeleteResearcher);
router.post('/edit', researcherController.postEditResearcher);
module.exports = router;