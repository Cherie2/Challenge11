const notes = require('express').Router();
const { readFromFile, readAndAppend, deleteAndUpdate } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// POST Route for a new note
notes.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
  
    if (req.body) {
      readAndAppend(req.body, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.err('Error in Adding note');
    }
  });

//DELETE Route for note
notes.delete('/notes/:id', (req, res) => {
  console.info(`${req.method} request received for notes id`);
  res.json(req.params.id);
  
  if (req.params.id) {
  deleteAndUpdate(req.params.id,'./db/db.json' );
  res.json('Note succesfully deleted')
  } else {
    res.err('Error in deleting note');
  }
 });

//Exports the data/notes to specific path
module.exports = notes;
