const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getPopularField = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let Field= [];
    let ProjectTitle = [];
    let ResearcherName = [];


    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT  F.Scientific_Field AS SField, P.Project_Title AS Title, CONCAT(R.First_Name , ' ' ,R.Last_Name) AS RName FROM Field F INNER JOIN Project P ON P.Project_Title = F.Project_Title INNER JOIN works_on W ON W.Project_Title = P.Project_Title INNER JOIN Researcher R ON R.Researcher_ID = W.Researcher_ID WHERE P.Starting_Date <= '2021-06-05' AND P.Due_Date >= '2022-06-05' ORDER BY F.Scientific_Field")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        Field.push(element.SField);
                        ProjectTitle.push(element.Title);
                        ResearcherName.push(element.RName);
                    })
                    console.log(Field);
                    console.log(ProjectTitle);
                    console.log(ResearcherName);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/popularField.ejs', {
                pageTitle: "Discover our Scientific Fields!",
                Field,
                ProjectTitle,
                ResearcherName,
                messages
            })
        });

    })
}