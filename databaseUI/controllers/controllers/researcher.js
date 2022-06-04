const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page*/
exports.getResearcher = (req, res, next) => {

    let researchers;

    /* create the connection */
    pool.getConnection((err, conn) => {

        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select Researcher_ID,First_Name,Last_Name,Sex,Dateof_Birh from Researcher")
                .then(([rows, fields]) => {      //??????
                    researchers = rows;
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/researcher.ejs', {
                pageTitle: "See All our Researchers! ",
                researchers
            })
        });

    })
}


exports.getInsertPage = (req, res, next) => {

    res.render('views/editResearcher.ejs', {
        pageTitle: "Insert a new Researcher! "
    })

}

exports.postResearcher = (req, res, next) => {

    /* get necessary data sent */
    const Researcher_ID = req.body.Researcher_ID;
    const First_Name = req.body.First_Name;
    const Last_Name = req.body.Last_Name;
    const Sex = req.body.Sex;
    const Dateof_Birth = req.body.Dateof_Birth;


    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Researcher(Researcher_ID,First_Name,Last_Name,Sex,Dateof_Birh) VALUES(?,?,?,?,?)`;

        conn.promise().query(sqlQuery, [Researcher_ID,First_Name,Last_Name,Sex,Dateof_Birh])
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/researcher');
            })
            .catch(err => {
                res.redirect('/researcher');
            })
    })
}

exports.postDeleteResearcher = (req, res, _) => {
    const Researcher_ID = req.params.id;
    /* create the connection, execute query, flash respective message and redirect to organization route */
    // console.log(Organization_Name)
    pool.getConnection((err, conn) => {

        conn.promise().query(`DELETE FROM Researcher WHERE Researcher_ID = '${Researcher_ID}'`)
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/researcher');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/researcher');
            })
    })

}

exports.postEditResearcher = (req, res, _) => {

    pool.getConnection((err, conn) => {

        let First_Name = req.body.firstname;
        let Last_Name = req.body.lastname;
        let Sex = req.body.sex;
        let Dateof_Birth = req.body.dateofbirth;

        let editQuery = `UPDATE Researcher SET First_Name=?, Last_Name=?, Sex= ?, Dateof_Birth = ? WHERE Researcher_ID=?;`;

        conn.promise().query(editQuery, [])
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/researcher');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/researcher');
            })
    })

}