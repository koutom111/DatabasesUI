const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getInterField = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let F1= [];
    let F2 = [];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select F1.Scientific_Field AS F1, F2.Scientific_Field AS F2, COUNT(F1.Project_Title) from Field F1 INNER JOIN Field F2 ON F1.Project_Title = F2.Project_Title\n  AND F1.Scientific_Field < F2.Scientific_Field WHERE F1.Scientific_Field <> F2.Scientific_Field GROUP BY F1.Scientific_Field, F2.Scientific_Field ORDER BY COUNT(F1.Project_Title) DESC LIMIT 3 ")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        F1.push(element.F1);
                        F2.push(element.F2);
                    })
                    console.log(F1);
                    console.log(F2);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/interField.ejs', {
                pageTitle: "See our top  3 interconnecting Fields !",
                F1 ,
                F2,
                messages
            })
        });

    })
}

/* Controller to render data shown in create student page */