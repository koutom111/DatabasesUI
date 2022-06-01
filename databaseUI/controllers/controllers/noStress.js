const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getNoStress = (req, res,  next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let Last_Name= [];
    let First_Name = [];
    let Count = [];


    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT COUNT(P.Project_Title) AS Count, R.First_Name, R.Last_Name FROM Researcher R INNER JOIN Works_On W  ON R.Researcher_ID = W.Researcher_ID INNER JOIN Project P ON P.Project_Title = W.Project_Title LEFT JOIN Deliverable D ON D.Project_Title = P.Project_Title WHERE D.Project_Title IS NULL  GROUP BY  R.First_Name, R.Last_Name HAVING (COUNT(P.Project_Title))>=5  ")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        Last_Name.push(element.Last_Name);
                        First_Name.push(element.First_Name);
                        Count.push(element.Count);
                    })
                    console.log(Last_Name);
                    console.log(First_Name);
                    console.log(Count);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/noStress.ejs', {
                pageTitle: "See our hardworking researchers with no stress!",
                Last_Name ,
                First_Name,
                Count,
                messages
            })
        });

    })
}