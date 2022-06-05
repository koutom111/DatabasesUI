const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page*/
exports.getProgram = (req, res, next) => {

    let programs;

    /* create the connection */
    pool.getConnection((err, conn) => {

        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select Program_Title,Description,Department from Program")
                .then(([rows, fields]) => {      //??????
                    programs = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/program.ejs', {
                pageTitle: "See All our Programs! ",
                programs
            })
        });

    })
}
exports.getProgramHome = (req, res, next) => {

    let programs;

    /* create the connection */
    pool.getConnection((err, conn) => {

        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select Program_Title,Description,Department from Program")
                .then(([rows, fields]) => {      //??????
                    programs = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/programHome.ejs', {
                pageTitle: "See All our Programs! ",
                programs
            })
        });

    })
}

exports.getInsertPage = (req, res, next) => {

    res.render('views/editProgram.ejs', {
        pageTitle: "Insert a new Program! "
    })

}

exports.postProgram = (req, res, next) => {

    /* get necessary data sent */
    const Program_Title = req.body.Program_Title;
    const Description = req.body.Description;
    const Department = req.body.Department;

    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Program(Program_Title,Description,Department) VALUES(?,?,?)`;

        conn.promise().query(sqlQuery, [Program_Title,Description,Department ])
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/program');
            })
            .catch(err => {
                res.redirect('/program');
            })
    })
}

exports.postDeleteProgram = (req, res, _) => {
    const Program_Title = req.params.id;
    /* create the connection, execute query, flash respective message and redirect to organization route */
    // console.log(Organization_Name)
    pool.getConnection((err, conn) => {

        conn.promise().query(`DELETE FROM Program WHERE Program_Title = '${Program_Title}'`)
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/program');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/program');
            })
    })

}

exports.postEditProgram = (req, res, _) => {

    pool.getConnection((err, conn) => {

        let programtitle = req.body.programtitle;
        let description = req.body['description'];
        let department = req.body.department;

        let editQuery = `UPDATE Program SET  Description=?, Department = ? WHERE Program_Title=?;`;


        conn.promise().query(editQuery, [description,department,programtitle])
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/program');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/program');
            })
    })

}