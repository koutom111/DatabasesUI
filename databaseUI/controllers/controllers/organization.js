const { pool } = require('../../utils/database');

/* Controller to render data shown in landing page*/
exports.getOrganization = (req, res, next) => {

    let organizations;

    /* create the connection */
    pool.getConnection((err, conn) => {

        let namePromise = new Promise((resolve, reject) => {
            conn.promise()
                .query("select * from Organization")
                .then(([rows, fields]) => {      //??????
                    organizations = rows;
                    // rows.forEach(element=>{
                    //     Organization_Title.push(element.Organization_Name);
                    //     Abbrevation.push(element.Abbrevation);
                    //     Street.push(element.Street);
                    //     Town.push(element.Town);
                    //     Number.push(element.Number);
                    //     Postal_Code.push(element.Postol_Code);
                    // })
                    // console.log(Organization_Title);
                    // console.log(Abbrevation);
                    // console.log(Street);
                    // console.log(Town);
                    // console.log(Number);
                    // console.log(Postal_Code);
                    resolve();
                })
                .then(() => pool.releaseConnection(conn))
                .catch(err => console.log(err))
        })


        /* when queries promises finish render respective data */
        Promise.all([namePromise]).then(() => {
            res.render('views/organization.ejs', {
                pageTitle: "See All our Organizations! ",
                organizations
            })
        });

    })
}


exports.getInsertPage = (req, res, next) => {

    res.render('views/editOrganization.ejs', {
        pageTitle: "Insert a new Organization! "
    })

}

exports.postOrganization = (req, res, next) => {

    /* get necessary data sent */
    const Organization_Name = req.body.Organization_Name;
    const Abbrevation = req.body.Abbrevation;
    const Street = req.body.Street;
    const Town = req.body.Town;
    const Number = req.body['Number'];
    const Postal_Code = req.body.Postal_Code;

    // console.log(Organization_Name, Abbrevation, Street, Town, Number, Postal_Code)

    pool.getConnection((err, conn) => {
        var sqlQuery = `INSERT INTO Organization(Organization_Name, Abbrevation, Street, Town, ['Number'], Postal_Code) VALUES(?,?,?,?,?,?)`;

        conn.promise().query(sqlQuery, [Organization_Name, Abbrevation, Street, Town, Number, Postal_Code])
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/organization');
            })
            .catch(err => {
                res.redirect('/organization');
            })
    })
}

exports.postDeleteOrganization = (req, res, _) => {
    const Organization_Name = req.params.id;
    /* create the connection, execute query, flash respective message and redirect to organization route */
    // console.log(Organization_Name)
    pool.getConnection((err, conn) => {

        conn.promise().query(`DELETE FROM Organization WHERE Organization_Name = '${Organization_Name}'`)
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/organization');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/organization');
            })
    })

}

exports.postEditOrganization = (req, res, _) => {

    pool.getConnection((err, conn) => {

        let abbr = req.body.abbrevation;
        let organization_name = req.body.organization_name;
        let street = req.body.street;
        let postal_code = req.body.postal_code;
        let town = req.body.town;
        let number = req.body.number;

        let editQuery = `UPDATE Organization SET Abbrevation=?, Street=?, ['Number']=? , Postal_Code = ?, Town = ? WHERE Organization_Name=?;`;

        // console.log(abbr, organization_name, street, town, number, postal_code)

        conn.promise().query(editQuery, [abbr, street, number, postal_code, town, organization_name])
            .then(() => {
                pool.releaseConnection(conn);
                res.redirect('/organization');
            })
            .catch(err => {
                console.log(err)
                res.redirect('/organization');
            })
    })

}