
/* Controller to render data shown in landing page */
exports.getHome = (req, res, next) => {

            res.render('views/home.ejs', {});

}

exports.getDeleteExecutive = (req, res, next) => {
    res.render('views/deleteExecutive.ejs', {
        pageTitle: "Delete Executive Page"
    })
}

exports.getDeleteOrganization = (req, res, next) => {
    res.render('views/deleteOrganization.ejs', {
        pageTitle: "Delete Organization Page"
    })
}

exports.getDeleteResearcher = (req, res, next) => {
    res.render('views/deleteResearcher.ejs', {
        pageTitle: "Delete Researcher Page"
    })
}
exports.getDeleteProgram = (req, res, next) => {
    res.render('views/deleteProgram.ejs', {
        pageTitle: "Delete Program Page"
    })
}

exports.getDeleteProject = (req, res, next) => {
    res.render('views/deleteProject.ejs', {
        pageTitle: "Delete Project Page"
    })
}

exports.getEditOrganization = (req, res, next) => {
    res.render('views/editOrganization.ejs', {
        pageTitle: "Edit Organization Page"
    })
}

exports.getEditProgram = (req, res, next) => {
    res.render('views/editProgram.ejs', {
        pageTitle: "Edit Program Page"
    })
}

exports.getEditExecutive = (req, res, next) => {
    res.render('views/editExecutive.ejs', {
        pageTitle: "Edit Executive Page"
    })
}

exports.getEditResearcher = (req, res, next) => {
    res.render('views/editResearcher.ejs', {
        pageTitle: "Edit Researcher Page"
    })
}
exports.getEditProject = (req, res, next) => {
    res.render('views/editProject.ejs', {
        pageTitle: "Edit Project Page"
    })
}

/* Controller to render data shown in create student page */