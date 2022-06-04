const express = require('express');
const programController = require('../../controllers/controllers/program');

const router = express.Router();

router.get('/', programController.getProgram);
router.get('/insert', programController.getInsertPage);
router.post('/insert', programController.postProgram);
router.post('/delete/:id', programController.postDeleteProgram);
router.post('/edit', programController.postEditProgram);
module.exports = router;