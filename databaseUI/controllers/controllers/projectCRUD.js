const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page*/
exports.getProjectCRUD = (req, res, next) => {

    let projects;

    /* create the connection */
    pool.getConnection((err, conn) => {

        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select * from Project")
                .then(([rows, fields]) => {      //??????
                    projects = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/projectCRUD.ejs', {
                pageTitle: "See All our Projects! ",
                projects
            })
        });

    })
}

exports.getInsertPage = (req, res, next) => {

    res.render('views/editProject.ejs', {
        pageTitle: "Insert a new Project! "
    })

}

exports.postProject = (req, res, next) => {

    /* get necessary data sent */
    const Project_Title = req.body.Project_Title;
    const Summary = req.body.Summary;
    const Grant = req.body.Grant;
    const Starting_Date = req.body.Starting_Date;
    const Due_Date = req.body.Due_Date;




    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Project(Project_Title, Summary, ['Grant'], Starting_Date, Due_Date) VALUES(?,?,?,?,?)`;

        conn.promise().query(sqlQuery, [Project_Title, Summary, ['Grant'], Starting_Date, Due_Date])
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/projectCRUD');
            })
            .catch(err => {
                res.redirect('/projectCRUD');
            })
    })
}

exports.postDeleteProject = (req, res, _) => {
    const Project_Title = req.params.id;
    pool.getConnection((err, conn) => {

        conn.promise().query(`DELETE FROM Project WHERE Project_Title = '${Project_Title}'`)
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/projectCRUD');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/projectCRUD');
            })
    })

}

exports.postEditProject = (req, res, _) => {

    pool.getConnection((err, conn) => {

        let projecttitle = req.body.projecttitle
        let summary = req.body['summary'];
        let grant = req.body.grant;
        let startingdate = req.body.startingdate;
        let duedate = req.body.duedate;


        let editQuery = `UPDATE Project SET Summary=?, ['Grant']=?, Starting_Date=? , Due_Date = ? WHERE Project_Title=?;`;


        conn.promise().query(editQuery, [summary,grant,startingdate,duedate,projecttitle])
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/projectCRUD');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/projectCRUD');
            })
    })

}