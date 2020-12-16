const express = require('express');
const fs = require('fs');
const app = express()
const PORT = process.env.PORT || 3000;
const path = require('path');
const db = require("../db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));


app.post('/api/notes', function(req, res) {
   let saveNote = req.body;
   let newNote = JSON.stringify(saveNote);
   console.log(newNote);   
   fs.writeFileSync("../db/db.json", newNote);
   return newNote;
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`)
});

app.get('/api/notes', function(req, res) {
    fs.readFileSync("../db/db.json");
    return res.json(db);
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

