const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getProject = (req, res, next) => {

    let Project_Title= [];
    let Summary = [];
    let Date = [];
    let Duration = [];
    let Executive = [];

    /* create the connection */
    pool.getConnection((err, conn) => {
        let sqlQuery = "select P.Project_Title AS Project_Title, P.Summary AS Summary, P.Starting_Date AS Starting_Date, P.Duration AS Duration,CONCAT(E.First_Name , ' ' ,E.Last_Name) AS ExName from Project P inner join Executive E on P.Executive_ID=E.Executive_ID WHERE P.Due_Date>curdate()";

        // if (param1) sqlQuery += ` AND P.Starting_Date = ${param1}`
        // if (param2) sqlQuery += ` AND Duration = ${param2}`
        // if (param3) sqlQuery += ` AND .... = ${param3}`

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query(sqlQuery)
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        Project_Title.push(element.Project_Title);
                        Summary.push(element.Summary);
                        Date.push(element.Starting_Date);
                        Duration.push(element.Duration);
                        Executive.push(element.ExName);

                    })
                    console.log(Project_Title);
                    console.log(Summary);
                    console.log(Date);
                    console.log(Duration);
                    console.log(Executive);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/project.ejs', {
                pageTitle: "See All our Projects! ",
                Project_Title ,
                Summary,
                Date,
                Duration,
                Executive
            })
        });

    })
}

/* Controller to render data shown in create student page */
