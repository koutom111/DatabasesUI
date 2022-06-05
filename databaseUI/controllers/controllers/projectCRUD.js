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

    let Programs_Titles, Organizations_Names, Executives_IDs, Researchers_IDs

    pool.getConnection((err, conn) => {
        let programTitlesPromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT Program_Title FROM Program")
                .then(([rows, fields]) => {
                    Programs_Titles = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })

        let OrganizationNamePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT Organization_Name FROM Organization")
                .then(([rows, fields]) => {
                    Organizations_Names = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })

        let ExecutiveIDPromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT Executive_ID, First_Name, Last_Name FROM Executive")
                .then(([rows, fields]) => {
                    Executives_IDs = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })

        let ResearcherIDPromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("SELECT Researcher_ID, First_Name, Last_Name FROM Researcher")
                .then(([rows, fields]) => {
                    Researchers_IDs = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        Promise.all([programTitlesPromise, ResearcherIDPromise, ExecutiveIDPromise, OrganizationNamePromise]).then(() => {
            res.render('views/editProject.ejs', {
                pageTitle: "Insert a new Project! ",
                Programs_Titles,
                Organizations_Names,
                Executives_IDs,
                Researchers_IDs
            })
        });


    })

}

exports.postProject = (req, res, next) => {

    /* get necessary data sent */
    const Project_Title = req.body.name;
    const Summary = req.body.Summary;
    const Grant = req.body.Grant;
    const Starting_Date = req.body.Starting_Date;
    const Due_Date = req.body.Due_Date;
    const Program_Title = req.body.program_title;
    const Organization_Name = req.body.organization_name;
    const Executive_ID = req.body.executive_id;
    const Researcher_ID = req.body.researcher_id;

    pool.getConnection((err, conn) => {
        let sqlQuery = "INSERT INTO Project (Project_Title, Summary, `Grant`, Starting_Date, Due_Date, Program_Title, Organization_Name, Executive_ID, Researcher_ID) VALUES(?,?,?,?,?,?,?,?,?)";

        conn.promise().query(sqlQuery, [Project_Title, Summary, Grant, Starting_Date, Due_Date, Program_Title, Organization_Name, Executive_ID, Researcher_ID])
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