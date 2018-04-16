const searchTask = require('./task/searchTask');
const addTask = require('./task/addTask');
const setDeadline = require('./task/setDeadline');
const setStatus = require('./task/setStatus');
const showTasks = require('./task/showTasks');
const setResponsible = require('./task/setResponsible');

const findUser = require('./user/findUser');
const addUser = require('./user/addUser');
const showUsers = require('./user/showUsers');

module.exports = {
  searchTask,
  addTask,
  setDeadline,
  setStatus,
  showTasks,
  setResponsible,
  findUser,
  addUser,
  showUsers,
};
