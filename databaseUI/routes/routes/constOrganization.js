const express = require('express');
const constOrganizationController = require('../../controllers/controllers/constOrganization');

const router = express.Router();

router.get('/', constOrganizationController.getConstOrganization);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;