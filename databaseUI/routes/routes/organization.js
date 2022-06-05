const express = require('express');
const organizationController = require('../../controllers/controllers/organization');

const router = express.Router();

// .../organization/ -> GET ALL ORGANIZATIONS
router.get('/', organizationController.getOrganization);
// .../organization/insert -> GET
router.get('/insert', organizationController.getInsertPage);
// .../organization/insert -> AD NEW ORGANIZATION -> POST REQUEST
router.post('/insert', organizationController.postOrganization);
// .../organization/delete/:id
router.post('/delete/:id', organizationController.postDeleteOrganization);
// .../organization/edit
router.post('/edit', organizationController.postEditOrganization);
module.exports = router;