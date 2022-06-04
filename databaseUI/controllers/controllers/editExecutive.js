const { pool } = require('../../utils/database');
/* Controller to render data shown in landing page*/
exports.getExecutive = (req, res, next) => {


    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let Executive_ID = [];
    let First_Name = [];
    let Last_Name = [];
    let Dateof_Birth = [];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select Executive_ID,First_Name,Last_Name, Dateof_Birth from Executive")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        Executive_ID.push(element.Executive_ID);
                        First_Name.push(element.First_Name);
                        Last_Name.push(element.Last_Name);
                        Dateof_Birth.push(element.Dateof_Birth);
                    })
                    console.log(Executive_ID);
                    console.log(First_Name);
                    console.log(Last_Name);
                    console.log(Dateof_Birth);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/executive.ejs', {
                pageTitle: "See All our Executives! ",
                Executive_ID,
                First_Name,
                Last_Name,
                Dateof_Birth,
                messages
            })
        });

    })
}

exports.postExecutive = (req, res, next) => {

    /* get necessary data sent */
    const Executive_ID = req.body.Executive_ID;
    const First_Name = req.body.First_Name;
    const Last_Name = req.body.Last_Name;
    const Dateof_Birth = req.body.Dateof_Birth;


    /* create the connection, execute query, flash respective message and redirect to executive route */
    pool.getConnection((err, conn) => {
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("insert into Executive(Executive_ID,First_Name,Last_Name, Dateof_Birth) values (${Executive_ID},${First_Name},${Last_Name},${Dateof_Birth})")
                .then(() => {
                        pool.releaseConnection(conn);
                        req.flash('messages', {type: 'success', value: "Successfully added a new Executive!"});
                        console.log("success!");
                        res.redirect('/executive');
                    })
                        .catch(err => {
                            req.flash('messages', {
                                type: 'error',
                                value: "Something went wrong, Executive could not be added."
                            });
                            console.log("no");
                            res.redirect('/executive');
                        })
                })
        })
    }


exports.postDeleteExecutive = (req, res, next) => {
    const Executive_ID = req.body.Executive_ID;
    /* create the connection, execute query, flash respective message and redirect to executive route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE * FROM Executive WHERE Executive_ID = @Executive_ID`;

        conn.promise().query(sqlQuery)
            .then(() => {
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully deleted Executive!" })
                res.redirect('/editExecutive');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Executive could not be deleted." })
                res.redirect('/editExecutive');
            })
    })

}