const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getProjectEvaluation = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let ProjectTitle= [];
    let Grade = [];
    let Grant=[];


    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select * from ProjectEvaluation")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        ProjectTitle.push(element.Project_Title);
                        Grade.push(element.Grade);
                        Grant.push(element.Grant);
                    })
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/projectEvaluation.ejs', {
                pageTitle: "See our Projects, their evaluations and their rewards!! ",
                ProjectTitle ,
                Grade,
                Grant,
                messages
            })
        });

    })
}