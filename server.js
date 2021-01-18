// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


fs.readFile("db/db.json","utf8", (err, data) => {

    if (err) throw err;
    var notes = JSON.parse(data);


    //this gets the notes
    app.get("/api/notes", function(req, res) {
        
        res.json(notes);
    });


    //this adds the current note to the db
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log(newNote);
    });


    app.get("/api/notes/:id", function(req,res) {
        res.json(notes[req.params.id]);
    });

    app.delete("/api/notes/:id", function(req, res) {
        notes.splice(req.params.id, 1);
        updateDb();
        console.log("Deleted note with id "+req.params.id);
    });


    //put this into function bcuz of an error
    app.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });
    
    // Display index.html when all other routes are accessed
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });
    

    //updates the json file whenever a note is added or deleted
    function updateDb() {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) throw err;
            return true;
        });
    }

});


// Setup listener
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
}); 