const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getProgram = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let ProgramTitle= [];
    let Description = [];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select Program_Title, Description from Program")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        ProgramTitle.push(element.Program_Title);
                        Description.push(element.Description);
                    })
                    console.log(ProgramTitle);
                    console.log(Description);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/program.ejs', {
                pageTitle: "Program Page",
                ProgramTitle ,
                Description,
                messages
            })
        });

    })
}

/* Controller to render data shown in create student page */
