const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getConstOrganization = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let Organization_Name= [];
    let Project_Cnt = [];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT Organization_Name, COUNT(Project_Title) Project_Cnt FROM (SELECT P.Organization_Name AS Organization_Name, Ye , Project_Cnt, LEAD(Project_Cnt, 1) OVER (PARTITION BY Organization_Name ORDER BY Ye) Next_Project_Cnt FROM (SELECT COUNT(P.Project_Title) AS Project_Cnt, O.Organization_Name, YEAR(P.Starting_Date) AS Ye FROM Organization O INNER JOIN Project P ON P.Organization_Name = O.Organization_Name GROUP BY O.Organization_Name, YEAR(P.Starting_Date) HAVING COUNT(P.Project_Title) >= 10) A) B WHERE Project_Cnt = Next_Project_Cnt ")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        Organization_Name.push(element.Organization_Name);
                        Project_Cnt.push(element.Project_Cnt);
                    })
                    console.log(Organization_Name);
                    console.log(Project_Cnt);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/constOrganization.ejs', {
                pageTitle: "See the most consistent Organizations!",
                Organization_Name,
                Project_Cnt,
                messages
            })
        });

    })
}