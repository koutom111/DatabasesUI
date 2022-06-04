const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page*/
exports.getResearcher = (req, res, next) => {


    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let Researcher_ID = [];
    let First_Name = [];
    let Last_Name = [];
    let Sex = [];
    let Dateof_Birth = [];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select Researcher_ID,First_Name,Last_Name, Sex,Dateof_Birth from Researcher")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        Researcher_ID.push(element.Researcher_ID);
                        First_Name.push(element.First_Name);
                        Last_Name.push(element.Last_Name);
                        Sex.push(element.Sex);
                        Dateof_Birth.push(element.Dateof_Birth);
                    })
                    console.log(Researcher_ID);
                    console.log(First_Name);
                    console.log(Last_Name);
                    console.log(Sex);
                    console.log(Dateof_Birth);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/researcher.ejs', {
                pageTitle: "See All our Researchers! ",
                Researcher_ID,
                First_Name,
                Last_Name,
                Sex,
                Dateof_Birth,
                messages
            })
        });

    })
}

exports.postResearcher = (req, res, next) => {

    /* get necessary data sent */
    const Researcher_ID = req.body.Researcher_ID;
    const First_Name = req.body.First_Name;
    const Last_Name = req.body.Last_Name;
    const Dateof_Birth = req.body.Dateof_Birth;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Researcher(Researcher_ID, First_Name, Last_Name,Sex,Dateof_Birth) VALUES(?, ?, ?,?,?)`;

        conn.promise().query(sqlQuery, [Researcher_ID, First_Name,Last_Name,Sex,Dateof_Birth])
            .then(() => {
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Researcher!" });
                console.log("success!");
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Researcher could not be added." });
                console.log("no");
                res.redirect('/');
            })
    })
}

exports.postDeleteResearcher = (req, res, next) => {
    const Researcher_ID = req.body.Researcher_ID;
    /* create the connection, execute query, flash respective message and redirect to organization route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE * FROM Researcher WHERE Researcher_ID = ${Researcher_ID}`;

        conn.promise().query(sqlQuery)
            .then(() => {
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully deleted Researcher!" })
                res.redirect('/editResearcher');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Researcher could not be deleted." })
                res.redirect('/editResearcher');
            })
    })

}