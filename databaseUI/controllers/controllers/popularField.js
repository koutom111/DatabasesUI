const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getPopularField = (req, res, next) => {

    const field = req.query.field;
    let Fields, result;
    /* create the connection */
    pool.getConnection((err, conn) => {

        let fetchAllFields = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT DISTINCT Scientific_Field FROM Field")
                .then(([rows, fields]) => {      //??????
                    Fields = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })

        let resultsPromise = new Promise((resolve, reject) => {
            let sqlQuery1 = `SELECT F.Scientific_Field AS SField, P.Project_Title AS Title, CONCAT(R.First_Name , ' ' ,R.Last_Name) AS RName FROM Field F INNER JOIN Project P ON P.Project_Title = F.Project_Title INNER JOIN Works_On W ON W.Project_Title = P.Project_Title INNER JOIN Researcher R ON R.Researcher_ID = W.Researcher_ID WHERE P.Starting_Date <= '2021-06-05' AND P.Due_Date >= '2022-06-05' `;
            if (field) sqlQuery1 += `AND F.Scientific_Field='${field}'`;

            conn.promise()
                .query(sqlQuery1)
                .then(([rows, fields]) => {      //??????
                    result = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([resultsPromise, fetchAllFields]).then(() => {
            res.render('views/popularField.ejs', {
                pageTitle: "Discover our Scientific Fields!",
                Fields,
                result,
            })
        });

    })
}