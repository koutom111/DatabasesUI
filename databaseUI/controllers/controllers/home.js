
/* Controller to render data shown in landing page */
exports.getHome = (req, res, next) => {

            res.render('views/home.ejs', {});

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