const express = require('express');
const htmlRoutes = require("./routes/html");
const notesRoutes = require("./routes/notes");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', notesRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () =>
  console.log(`Notetaking app listening at http://localhost:${PORT}`)
);