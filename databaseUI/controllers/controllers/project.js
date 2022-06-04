const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getProject = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let Project_Title= [];
    let Summary = [];
    let Date = [];
    let Duration = [];
    let Executive = [];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select P.Project_Title AS Project_Title, P.Summary AS Summary, P.Starting_Date AS Starting_Date, P.Duration AS Duration,CONCAT(E.First_Name , ' ' ,E.Last_Name) AS ExName from Project P inner join Executive E on P.Executive_ID=E.Executive_ID WHERE P.Due_Date>curdate()")
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
                Executive,
                messages
            })
        });

    })
}

exports.postProject = (req, res, next) => {

    /* get necessary data sent */
    const Project_Title = req.body.Project_Title;
    const Summary = req.body.Summary;
    const Grant = req.body.Grant;

    /* create the connection, execute query, flash respective message and redirect to project route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Project(Project_Title, Summary, Grant) VALUES(?, ?, ?)`;

        conn.promise().query(sqlQuery, [Project_Title, Summary, Grant])
            .then(() => {
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Project!" });
                console.log("success!");
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Project could not be added." });
                console.log("no");
                res.redirect('/');
            })
    })
}

exports.postDeleteProject = (req, res, next) => {
    const Project_Title = req.body.Project_Title;
    /* create the connection, execute query, flash respective message and redirect to organization route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE * FROM Project WHERE Project_Title = ${Program_Title}`;

        conn.promise().query(sqlQuery)
            .then(() => {
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully deleted Project!" })
                res.redirect('/project');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Project could not be deleted." })
                res.redirect('/project');
            })
    })

}
/* Controller to render data shown in create student page */
