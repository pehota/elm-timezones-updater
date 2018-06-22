const initialize = () => Promise.resolve();
const logError = err => console.error(`Error: ${err}`);
const { checkForDBUpdates, downloadDB, loadDB } = require('./db');
const { writeElm } = require('./write-elm');

initialize()
  .then(checkForDBUpdates)
  .then(downloadDB)
  .then(loadDB)
  .then(writeElm)
  .catch(logError);
