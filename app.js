const express = require('express');
const mongoose = require('mongoose');
const Note = require('./data/Note');
const User = require('./data/User');
const path = require("path");

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoDB = 'mongodb://localhost:27017/'; 
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/', async function (req,res) {
    console.log("Posted with body: " + JSON.stringify(req.body));
    try {
        const newNote = new Note({
            text: req.body.text,
            lastUpdatedDate : req.body.lastUpdatedDate,
        })
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        console.log("Error on Post: " + error.message)
        res.status(400);
        res.send(error.message);
    }
})

app.use(express.static(path.join(__dirname, "./build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

port = process.env.PORT || 3000;
app.listen(port, () => { console.log('server started!')});