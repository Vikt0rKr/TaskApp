const Task = require('./Task.js');
const taskBase = require('./taskBase.js');
const searchTask = require('./searchTask.js');
const addTask = require('./addTask.js');
const setDeadline = require('./setDeadline.js');
const setStatus = require('./setStatus.js');
const showTasks = require('./showTasks.js');
const setResponsible = require('./setResponsible.js');

module.exports = {
  Task, taskBase, searchTask, addTask, setDeadline, setStatus, showTasks, setResponsible,
};
