const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getProject = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let ProjectTitle= [];
    let Summary = [];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select Project_Title, Summary from Project")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        ProjectTitle.push(element.Project_Title);
                        Summary.push(element.Summary);
                    })
                    console.log(ProjectTitle);
                    console.log(Summary);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/project.ejs', {
                pageTitle: "See All our Projects! ",
                ProjectTitle ,
                Summary,
                messages
            })
        });

    })
}

exports.postProject = (req, res, next) => {

    /* get necessary data sent */
    const Project_Title = req.body.Project_Title;
    const Summary = req.body.Summary;
    const Grant = req.body.Grant;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Project(Project_Title, Summary, Grant) VALUES(?, ?, ?)`;

        conn.promise().query(sqlQuery, [Project_Title, Summary, Grant])
            .then(() => {
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Project!" });
                console.log("success!");
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Project could not be added." });
                console.log("no");
                res.redirect('/');
            })
    })
}

/* Controller to render data shown in create student page */
