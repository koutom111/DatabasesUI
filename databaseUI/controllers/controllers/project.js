const { pool } = require('../../utils/database');

/* Controller to retrieve project from database */
exports.getProject = (req, res, next) => {

    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    /* create the connection, execute query, render data */
    pool.getConnection((err, conn) => {
        
        conn.promise().query('SELECT * FROM Project')
        .then(([rows, fields]) => {
            res.render('project.ejs', {
                pageTitle: "Project Page",
                project: rows,
                messages: messages
            })
        })
        .then(() => pool.releaseConnection(conn))
        .catch(err => console.log(err))
    })

}

/* Controller to create a new project in the database */
exports.postProject = (req, res, next) => {

    /* get necessary data sent */
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Project(name, surname, email) VALUES(?, ?, ?)`;

        conn.promise().query(sqlQuery, [name, surname, email])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully added a new Project!" })
            res.redirect('/');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Project could not be added." })
            res.redirect('/');
        })
    })
}

/* Controller to update a Project in the database */
exports.postUpdateProject = (req, res, next) => {

    /* get necessary data sent */
    const id = req.body.id;
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `UPDATE Project SET name = ?, surname = ?, email = ? WHERE id = ${id}`;

        conn.promise().query(sqlQuery, [name, surname, email])
        .then(() => {
            pool.releaseConnection(conn);
            req.flash('messages', { type: 'success', value: "Successfully updated Project!" })
            res.redirect('/project');
        })
        .catch(err => {
            req.flash('messages', { type: 'error', value: "Something went wrong, Project could not be updated." })
            res.redirect('/project');
        })
    })
}