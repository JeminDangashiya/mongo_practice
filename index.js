const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const connectionString = "";

// connect node to mongodb
MongoClient.connect(connectionString, {
        useUnifiedTopology: true
    })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('practice_app')

        app.get('/', (req, res) => {
            const users = db.collection('users');
            users.find().toArray()
                .then(results => {
                    res.send(results)
                })
                .catch(error => console.error(error))
        })

        app.get('/post', (req, res) => {
            const users = db.collection('users');
            users.insertOne({
                    firstName: "Shaikh 1",
                    lastName: "Irshad 1"
                }).then(result => {
                    res.send(results)
                })
                .catch(error => console.error(error))
        })
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// configure the server's listen port and give user feedback
app.listen(8080);