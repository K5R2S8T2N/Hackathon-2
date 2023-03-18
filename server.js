const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const path = require('path');
let notes = [];
let signedIn = "";

app.use(express.json());

const db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'ryJXQ3Qxu7',
        database: 'Hackathon2',
        port: "5432",
    }
});
app.set("db", db);
app.use(cors());

app.use(express.static('public'));

app.get('/entries.html', (req, res) => {
    res.send('testing');

})
// for registering 
app.post('/register', (req, res) => {
    const {username, password} = req.body;
    let count = 0;
    db('users')
    .where('username', username)
    .then((data) => {
        data.forEach((element) => {
            count++;
        });
        if (!count == 0){
            console.log("username already taken");
            res.send({message: `username "${username}" already taken`});
        } else {
            db('users')
            .insert({
                username: username,
                password: password,
            })
            .then((data) => {
                console.log(data);
            });
            res.send({message: `User "${username}" created`});
        }
    });     
});

// for logging in 
app.post('/login', (req, res) => {
    signedIn = "";
    const {username, password} = req.body;
    let count = 0;
    db('users')
    .where({ username:`${username}`, password: `${password}`})
    .then((data) => {
        data.forEach((element) => {
            count++;
        });
        if (!count == 0){
            console.log("login successful");
            db
            // saving username 
            .select('username').from('users')
            .where({ username:`${username}`, password: `${password}`})
            .then(data => {
                data.forEach(value => {
                    signedIn = value.username;
                })
            });

            // rendering all notes on screen
            db
            .select('notes').from('users')
            .where({ username:`${username}`})
            .then(data => {
                console.log(data);
                notes = [];
                data.forEach((value) => {
                    notes.push(value.notes);
                })
                console.log(signedIn);
                res.send({message: `login successful`})
            });
        } else {
            console.log("username or password is incorrect");
            res.send({message: `username or password is incorrect`});
        }
    });     
});

// for displaying diary entries 
app.post('/entries', (req, res) => {
    res.send({data: notes});
})

// logout 
app.post('/logout', (req, res) => {
    notes = [];
    signedIn = "";
    res.send({message: `logout successful`});
});

// deleting an entry 
app.post('/deleteNote', (req, res) => {
    const {notes} = req.body;
    console.log(notes, signedIn);
    db('users')
        .where('username', `${signedIn}`)
        .andWhere('notes', `${notes}`)
        .del(['user_id', 'username', 'password', 'notes'])
        .then(users =>
            res.send({message: `delete successful`})
        )
});

// saving new note 
app.post('/new', (req, res) => {
    const {note} = req.body;
    console.log(note, signedIn);
    db('users')
        .insert({ username: `${signedIn}`, notes: `${note}`})
        .then(user =>
            res.send({message: `new note added successfully, you may need to re-login to view note`})
        )
});

app.listen(port, () => console.log('Server listening on port ' + port));
