const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page*/
exports.getExecutive = (req, res, next) => {

    let executives;

    /* create the connection */
    pool.getConnection((err, conn) => {

        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select Executive_ID,First_Name,Last_Name,Dateof_Birth from Executive")
                .then(([rows, fields]) => {      //??????
                    executives = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })
        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/executive.ejs', {
                pageTitle: "See All our Executives! ",
                executives
            })
        });

    })
}


exports.getInsertPage = (req, res, next) => {

    res.render('views/editExecutive.ejs', {
        pageTitle: "Insert a new Executive! "
    })

}

exports.postExecutive = (req, res, next) => {

    /* get necessary data sent */
    const Executive_ID = req.body.Executive_ID;
    const First_Name = req.body.First_Name;
    const Last_Name = req.body.Last_Name;
    const Dateof_Birth = req.body.Dateof_Birth;

    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Executive(Executive_ID,First_Name,Last_Name,Dateof_Birth) VALUES(?,?,?,?,?)`;

        conn.promise().query(sqlQuery, [Executive_ID,First_Name,Last_Name,Dateof_Birth])
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/executive');
            })
            .catch(err => {
                res.redirect('/executive');
            })
    })
}

exports.postDeleteExecutive = (req, res, _) => {
    const Executive_ID = req.params.id;
    /* create the connection, execute query, flash respective message and redirect to executive route */
    pool.getConnection((err, conn) => {

        conn.promise().query(`DELETE FROM Executive WHERE Executive_ID = '${Executive_ID}'`)
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/executive');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/executive');
            })
    })

}

exports.postEditExecutive = (req, res, _) => {

    pool.getConnection((err, conn) => {

        let executiveid = req.body.executiveid;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let dateofbirth = req.body.dateofbirth;

        let editQuery = `UPDATE Executive SET First_Name=?, Last_Name=?, Dateof_Birth=? WHERE Executive_ID=?;`;

        conn.promise().query(editQuery, [firstname,lastname,dateofbirth,executiveid])
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/executive');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/executive');
            })
    })

}