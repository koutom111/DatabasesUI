const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getProject = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let ProjectTitle= [];
    let Summary = [];
    let Date = [];
    let Duration = [];
    let Executive = [];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select P.Project_Title AS Project_Title, P.Summary AS Summary, P.Starting_Date AS Starting_Date, P.Duration AS Duration,CONCAT(First_Name , ' ' , Last_Name) AS ExName from Project P inner join Executive E on P.Executive_ID=E.Executive_ID")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        ProjectTitle.push(element.Project_Title);
                        Summary.push(element.Summary);
                        Date.push(element.Starting_Date);
                        Duration.push(element.Duration);
                        Executive.push(element.ExName);

                    })
                    console.log(ProjectTitle);
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
                ProjectTitle ,
                Summary,
                Date,
                Duration,
                Executive,
                messages
            })
        });

    })
}

/* Controller to render data shown in create student page */
