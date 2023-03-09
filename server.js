const express = require('express');
const app = express();
const port = 3000;

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'ryJXQ3Qxu7',
        database: 'Hollywood',
        port: 5432
    }
});


app.set("db", db);

app.get('/', (req, res) => {
    db('actors')
    .where('first_name', 'Gal')
    .del(['actor_id', 'first_name', 'last_name'])
    .then(actors =>
        res.send(actors)
    )
});


app.listen(port, () => console.log('Server listening on port ' + port));