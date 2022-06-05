const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getProject = (req, res, next) => {
    let Start_Date = req.query.Start_Date;
    let Duration = req.query.Duration;
    let Executive_ID = req.query.Executive_ID;

    let result, Executives;

    /* create the connection */
    pool.getConnection((err, conn) => {

        let ExecutivesPromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT Executive_ID, First_Name, Last_Name FROM Executive")
                .then(([rows, fields]) => {
                    Executives = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })

        let fetchResPromise = new Promise((resolve, reject) => {
            let sqlQuery = `select P.Project_Title AS Project_Title, P.Program_Title, P.Summary AS Summary, P.Starting_Date AS Starting_Date, P.Duration AS Duration,CONCAT(E.First_Name , ' ' ,E.Last_Name) AS ExName from Project P inner join Executive E on P.Executive_ID=E.Executive_ID WHERE P.Due_Date>curdate() `;

            if (Start_Date) sqlQuery +=  ` AND P.Starting_Date = '${Start_Date}'`
            if (Duration) sqlQuery += ` AND Duration = ${Duration}`
            if (Executive_ID) sqlQuery += ` AND P.Executive_ID = ${Executive_ID}`

            conn.promise()
                .query(sqlQuery)
                .then(([rows, fields]) => {
                    result = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })

        /* when queries promises finish render respective data */
        Promise.all([fetchResPromise, ExecutivesPromise]).then(() => {
            console.log(result)
            res.render('views/project.ejs', {
                pageTitle: "See projects based on filters! ",
                Executives,
                result
            })
        });

    })
}

exports.getResearchers = (req, res, next) => {

    const project_id = req.params.id;

    // query to get all researchers working on project with project_id = project_id

    let sqlQuery = `SELECT * FROM workson WHERE project_id = ${project_id}`

}