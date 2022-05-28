const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getPerson = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let personName;

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select * from Person")
                .then(([rows, fields]) => {      //??????
                    personName = rows[0].PersonName;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('person.ejs', {
                pageTitle: "Person Page",
                personName,
                messages
            })
        });

    })
}

/* Controller to render data shown in create student page */
