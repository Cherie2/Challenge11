const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

//Writing to file function
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */

//Read file and append contwnt function
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//Delete function
const deleteAndUpdate = (content, file) => {  
  let allNotes = JSON.parse(fs.readFileSync(file, "utf8"));
  let noteId = content;

  //Filters all notes and saves the notes without a matching id to a new array
  //The array with matching note Id will be deleted
  allNotes = allNotes.filter(selected =>{
      return selected.id != noteId;
  });

  //write the updated data to db.json and display the updated note
  writeToFile(file, allNotes);
};


module.exports = { readFromFile, writeToFile, deleteAndUpdate, readAndAppend };
