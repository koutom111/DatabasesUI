const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getBestExecutives = (req, res,  next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let Last_Name= [];
    let First_Name = [];
    let Organization_Name = [];
    let Sum = [];


    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT SUM(P.Grant) AS Sum, C.Organization_Name, E.First_Name, E.Last_Name FROM Executive E INNER JOIN Project P    ON E.Executive_ID = P.Executive_ID INNER JOIN Organization O   ON O.Organization_Name = P.Organization_Name INNER JOIN Corporation C  ON C.Organization_Name = O.Organization_Name GROUP BY C.Organization_Name, E.Executive_ID ORDER BY SUM(P.Grant) DESC LIMIT 5")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        Last_Name.push(element.Last_Name);
                        First_Name.push(element.First_Name);
                        Organization_Name.push(element.Organization_Name);
                        Sum.push(element.Sum);
                    })
                    console.log(Last_Name);
                    console.log(First_Name);
                    console.log(Organization_Name);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/bestExecutives.ejs', {
                pageTitle: "See our best best Executives!",
                Last_Name ,
                First_Name,
                Organization_Name,
                Sum,
                messages
            })
        });

    })
}
