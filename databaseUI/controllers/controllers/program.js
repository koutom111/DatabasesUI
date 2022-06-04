const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page */
exports.getProgram = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let Program_Title= [];
    let Description = [];
    let Department = [];
    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select Program_Title, Description,Department from Program")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        Program_Title.push(element.Program_Title);
                        Description.push(element.Description);
                        Department.push(element.Department);
                    })
                    console.log(Program_Title);
                    console.log(Description);
                    console.log(Department);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/program.ejs', {
                pageTitle: "See All our Programs! ",
                Program_Title ,
                Description,
                Department,
                messages
            })
        });

    })
}
exports.postProgram = (req, res, next) => {

    /* get necessary data sent */
    const Program_Title = req.body.Program_Title;
    const Description = req.body.Description;
    const Department = req.body.Department;

    /* create the connection, execute query, flash respective message and redirect to program route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Program(Program_Title , Description,Department) VALUES(?, ?, ?)`;

        conn.promise().query(sqlQuery, [Program_Title, Description,Department])
            .then(() => {
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Program!" });
                console.log("success!");
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Program could not be added." });
                console.log("no");
                res.redirect('/');
            })
    })
}
/* Controller to render data shown in create student page */
exports.postDeleteProgram = (req, res, next) => {
    const Program_Title = req.body.Program_Title;
    /* create the connection, execute query, flash respective message and redirect to organization route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE * FROM Program WHERE Program_Title = ${Program_Title}`;

        conn.promise().query(sqlQuery)
            .then(() => {
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully deleted Program!" })
                res.redirect('/program');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Program could not be deleted." })
                res.redirect('/program');
            })
    })

}
