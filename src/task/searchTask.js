const taskBase = require('./taskBase.js');

function searchForTask(title) {
  let taskNew;
  taskBase.forEach((task) => {
    if (task.title === title) {
      taskNew = task;
    }
  });
  return taskNew;
}

module.exports = searchForTask;
