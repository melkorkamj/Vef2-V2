const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL; // sótt úr env gegnum dotenv pakka

async function insert(name, email, phone, text, job, processed) {
    const client = new Client({
        connectionString,
    });
    client.connect();
    try {
        const query = 'INSERT INTO applications (name, email, phone, text, job, processed) VALUES ($1, $2, $3, $4, $5, $6)';
        const res = await client.query(query, [name, email, phone, text, job, processed]);
        console.log(res.rows);
      } catch (err) {
        console.log(err);
      }
      await client.end;
}

module.exports = {
    insert,
};
