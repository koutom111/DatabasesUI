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

/* Controller to render data shown in create student page */
