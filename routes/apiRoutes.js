const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
  // GET /api/notes - Read the db.json file and return all saved notes as JSON.
  app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while reading the database.');
      }
      res.json(JSON.parse(data));
    });
  });

  // POST /api/notes - Receive a new note, save it to the db.json file, and return the new note.
  app.post('/api/notes', (req, res) => {
    const newNote = { id: uuidv4(), ...req.body };

    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while reading the database.');
      }

      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred while saving the note.');
        }

        res.json(newNote);
      });
    });
  });
};
