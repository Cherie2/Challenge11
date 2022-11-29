const html = require('express').Router();
const path = require('path')

html.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '../public/notes.html'))
);
//*(wildcard) limits routes to just these two if any other paths are typed in
html.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '../public/index.html'))
);


module.exports = html;