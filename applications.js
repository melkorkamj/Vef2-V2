const express = require('express');
const router = express.Router();
const { runQuery } = require('./db');
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL; // sótt úr env gegnum dotenv pakka

// router.use(express.urlencoded({ extended: true }));
router.use(express.json());

function catchErrors(fn) {
    return (req, res, next) => fn(req, res, next).catch(next);
}

/*router.get('/applications', async (req, res) => {
    const client = new Client({
        connectionString,
    });
    client.connect();
    let applications;
    try {
        applications = await client.query(`SELECT * FROM applications ORDER BY id`);
      } catch (err) {
        throw(err);
      } finally {
          await client.end();
      }
     return applications.rows;
});*/

async function startFunction(req, res) {
    const client = new Client({
        connectionString,
    });
    client.connect();
    let applications;
    try {
        applications = await client.query(`SELECT * FROM applications ORDER BY id`);
    } catch (err) {
        throw(err);
    } finally {
          await client.end();
    }
    return applications.rows;
} 
startFunction().catch((err) => { console.error(err); });

router.get('/applications', async(req, res) => {
    const applications = await startFunction();
    res.render('applications', { title: 'Atvinnuumsóknir', applications: applications });
});

async function processFunction(req, res) {
    const idd = req.params.id;
    await runQuery(`UPDATE applications SET processed = true, updated = current_timestamp WHERE id = ${idd}`);
    return res.redirect('/applications');
}

async function deleteFunction(req, res) {
    const idd = req.params.id;
    await runQuery(`DELETE FROM applications WHERE id = ${idd}`);
    return res.redirect('/applications');
}

router.post('/applications/process/:id', catchErrors(processFunction));
router.post('/applications/delete/:id', catchErrors(deleteFunction));

module.exports = router;