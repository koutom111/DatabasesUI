
/* Controller to render data shown in landing page */
exports.getHome = (req, res, next) => {

            res.render('views/home.ejs', {});

}

exports.getEditProject = (req, res, next) => {
    res.render('views/editProject.ejs', {
        pageTitle: "Edit Project Page"
    })
}

/* Controller to render data shown in create student page */