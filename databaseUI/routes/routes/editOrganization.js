const express = require('express');
const organizationController = require('../../controllers/controllers/editOrganization');

const router = express.Router();

router.get('/', organizationController.getOrganization);
router.post('/editOrganization', organizationController.postOrganization);
router.post('/deleteOrganization', organizationController.postDeleteOrganization);
module.exports = router;