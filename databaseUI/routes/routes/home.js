const express = require('express');
const homeController = require('../../controllers/controllers/home');

const router = express.Router();

router.get('/', homeController.getHome);
router.get('/editProjectPage', homeController.getEditProject);
router.get('/editResearcherPage',homeController.getEditResearcher);
router.get('/editExecutivePage',homeController.getEditExecutive);
router.get('/editProgramPage',homeController.getEditProgram);
router.get('/editOrganizationPage',homeController.getEditOrganization);
router.get('/deleteExecutivePage',homeController.getDeleteExecutive);
router.get('/deleteOrganizationPage',homeController.getDeleteOrganization);
router.get('/deleteResearcherPage',homeController.getDeleteResearcher);
router.get('/deleteProgramPage',homeController.getDeleteProgram);
router.get('/deleteProjectPage',homeController.getDeleteProject);
//router.get('/student-creation-page', layoutController.getCreateStudent)

module.exports = router;