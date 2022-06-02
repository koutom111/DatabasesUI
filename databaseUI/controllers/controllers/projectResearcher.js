const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getProjectResearcher = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let ProjectTitle= [];
    let ResearcherName = [];
    let ScientificManagerName=[];
    let EvaluatorName=[];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select * from ProjectResearch")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        ProjectTitle.push(element.Project_Title);
                        ResearcherName.push(element.Researcher_Name);
                        ScientificManagerName.push(element.ScientificManager_Name);
                        EvaluatorName.push(element.Evaluator_Name);
                    })
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/projectResearcher.ejs', {
                pageTitle: "See our Projects and the Researchers working on it! ",
                ProjectTitle ,
                ResearcherName,
                ScientificManagerName,
                EvaluatorName,
                messages
            })
        });

    })
}