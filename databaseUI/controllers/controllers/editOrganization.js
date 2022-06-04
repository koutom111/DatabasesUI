const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page*/
exports.getOrganization = (req, res, next) => {
    /* check for messages in order to show them when rendering the page */
    let messages = req.flash("messages");
    if (messages.length === 0) messages = [];

    let Organization_Title = [];
    let Abbrevation = [];
    let Street = [];
    let Town = [];
    let Number = [];
    let Postal_Code = [];

    /* create the connection */
    pool.getConnection((err, conn) => {

        /* execute query to get best dribbler */
        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select Organization_Title,Abbrevation,Street,Town,Number,Postal_Code from Organization")
                .then(([rows, fields]) => {      //??????
                    rows.forEach(element=>{
                        Organization_Title.push(element.Organization_Title);
                        Abbrevation.push(element.Abbrevation);
                        Street.push(element.Street);
                        Town.push(element.Town);
                        Number.push(element.Number);
                        Postal_Code.push(element.Postol_Code);
                    })
                    console.log(Organization_Title);
                    console.log(Abbrevation);
                    console.log(Street);
                    console.log(Town);
                    console.log(Number);
                    console.log(Postal_Code);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/organization.ejs', {
                pageTitle: "See All our Organizations! ",
                Organization_Title,
                Abbrevation,
                Street,
                Town,
                Number,
                Postal_Code,
                messages
            })
        });

    })
}


exports.postOrganization = (req, res, next) => {

    /* get necessary data sent */
    const Organization_Name = req.body.Organization_Name;
    const Abbrevation = req.body.Abbrevation;
    const Street = req.body.Street;
    const Town = req.body.Town;
    const Number = req.body.Number;
    const Postal_Code = req.body.Postal_Code;

    /* create the connection, execute query, flash respective message and redirect to grades route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Organization(Organization_Name, Abbrevation, Street,Town,Number,Postal_Code) VALUES(${Organization_Name},${Abbrevation},${Street},${Town},${Number},${Postal_Code})`;

        conn.promise().query(sqlQuery, [Organization_Name, Abbrevation,Street,Town,Number,Postal_Code])
            .then(() => {
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully added a new Organization!" });
                console.log("success!");
                res.redirect('/');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Organization could not be added." });
                console.log("no");
                res.redirect('/');
            })
    })
}

exports.postDeleteOrganization = (req, res, next) => {
    const Organization_Name = req.body.Organization_Name;
    /* create the connection, execute query, flash respective message and redirect to organization route */
    pool.getConnection((err, conn) => {
        var sqlQuery = `DELETE * FROM Organization WHERE Organization_Name = ${Organization_Name}`;

        conn.promise().query(sqlQuery)
            .then(() => {
                pool.releaseConnection(conn);
                req.flash('messages', { type: 'success', value: "Successfully deleted grade!" })
                res.redirect('/editOrganization');
            })
            .catch(err => {
                req.flash('messages', { type: 'error', value: "Something went wrong, Grade could not be deleted." })
                res.redirect('/editOrganization');
            })
    })

}