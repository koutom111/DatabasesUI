const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getYoungResearcher = (req, res,  next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let Last_Name= [];
    let First_Name = [];
    let Project_Cnt = [];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT R.Researcher_ID, R.Last_Name, R.First_Name, COUNT(W.Project_Title) Project_Cnt FROM Researcher R INNER JOIN Works_On W ON W.Researcher_ID = R.Researcher_ID WHERE R.Age < 40 GROUP BY R.Researcher_ID, R.Last_Name, R.First_Name HAVING COUNT(Project_Title) = (SELECT MAX(Project_Cnt)  FROM (SELECT R.Researcher_ID, R.Last_Name, R.First_Name, COUNT(W.Project_Title) Project_Cnt FROM Researcher R INNER JOIN Works_On W ON W.Researcher_ID = R.Researcher_ID INNER JOIN Project P ON P.Project_Title = W.Project_Title WHERE R.Age < 40 AND P.Due_Date >= '2022-05-28' GROUP BY R.Researcher_ID, R.Last_Name, R.First_Name) A)")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        Last_Name.push(element.Last_Name);
                        First_Name.push(element.First_Name);
                        Project_Cnt.push(element.Project_Cnt)
                    })
                    console.log(Last_Name);
                    console.log(First_Name);
                    console.log(Project_Cnt);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/youngResearcher.ejs', {
                pageTitle: "See our best young researchers!",
                Last_Name ,
                First_Name,
                Project_Cnt,
                messages
            })
        });

    })
}
