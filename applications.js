const express = require('express');

const router = express.Router();

const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL; // sótt úr env gegnum dotenv pakka

//router.use(express.urlencoded({ extended: true }));
router.use(express.json());

function catchErrors(fn) {
    return (req, res, next) => fn(req, res, next).catch(next);
}

router.get('/applications', async (req, res) => {
    const client = new Client({
        connectionString,
    });
    client.connect();
    try {
        const applications = await client.query('SELECT * FROM applications');
        res.render('applications', { applications: applications.rows });
      } catch (err) {
        throw(err);
      }
     await client.end;
});

router.post('/applications', async (req, res) => {
    const client = new Client({
        connectionString,
    });
    client.connect();
    try {
        const { body: { id } = {} } = req;
        console.log(id);
        const applications = await client.query('UPDATE applications SET processed = true WHERE id = ($1) RETURNING *', [id]);
        res.render('applications', { applications: applications.rows });
      } catch (err) {
        throw(err);
      }
      await client.end;
});

router.post('/applications', async (req, res) => {
    const client = new Client({
        connectionString,
    });
    client.connect();
    try {
        const { body: { id } = {} } = req;
        console.log(id);
        const applications = await client.query('DELETE * FROM applications WHERE ');
        res.render('applications', { applications: applications.rows });
      } catch (err) {
        console.log(err);
        throw(err);
      }
      
});

module.exports = router;