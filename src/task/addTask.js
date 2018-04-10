const Task = require('./Task.js');
const taskBase = require('./taskBase.js');
const userBase = require('../user/userBase.js');
const searchForTask = require('./searchTask.js');

const addTask = (from, title, description, deadline, responsible) => {
  if (searchForTask(title) === undefined) {
    const newTask = new Task(from, title, description, deadline, responsible);
    taskBase.push(newTask);
    userBase.forEach((user) => {
      if (user.name === newTask.responsible) {
        user.tasks.push(newTask);
      }
    });
    console.log(`Added task ${title}`);
  } else {
    console.log(`Cannot add task ${title}`);
  }
};

module.exports = addTask;
