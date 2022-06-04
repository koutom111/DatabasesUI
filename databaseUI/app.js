const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const router = express.Router();

require('custom-env').env('localhost');

/* ROUTES and how to import routes */

const program = require('./routes/routes/program');
const project = require('./routes/routes/project');
const home = require('./routes/routes/home');
const interField = require('./routes/routes/interField');
const youngResearcher = require('./routes/routes/youngResearcher');
const bestExecutives = require('./routes/routes/bestExecutives');
const noStress = require('./routes/routes/noStress');
const organization = require('./routes/routes/organization');
const projectResearcher= require('./routes/routes/projectResearcher');
const projectEvaluation= require('./routes/routes/projectEvaluation');
const executive = require('./routes/routes/executive');
const researcher = require('./routes/routes/researcher');
const constOrganization = require('./routes/routes/constOrganization');
const popularField = require('./routes/routes/popularField');

// const grades = require('./routes/grades');
// const students = require('./routes/students');

/* end of ROUTES and how to import routes */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(flash());

app.use(session({
    secret: "ThisShouldBeSecret",
    resave: false,
    saveUninitialized: false
}));

/* Routes used by the project */

 app.use('/', home);

app.use('/interField', interField);
 app.use('/program', program);
 app.use('/project', project);
app.use('/youngResearcher', youngResearcher);
app.use('/bestExecutives', bestExecutives);
app.use('/noStress', noStress);
app.use('/projectResearcher', projectResearcher);
app.use('/projectEvaluation', projectEvaluation);
app.use('/organization', organization);
app.use('/executive',executive);
app.use('/researcher',researcher);
app.use('/constOrganization',constOrganization);
app.use('/popularField',popularField);
// app.use('/editProject', project);
// app.use ('editProgram', program);
// app.use ('/editOrganization', organization);
//
// app.use('/editProjectPage', home);
// app.use ('/editProgramPage', program);
// app.use ('/editOrganizationPage', organization);


/* End of routes used by the project */

// In case of an endpoint does not exist must return 404.html
app.use((req, res, next) => { res.status(404).render('views/404.ejs', { pageTitle: '404' }) })

module.exports = app; 