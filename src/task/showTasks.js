const taskBase = require('./taskBase.js');

const showTasks = (status) => {
  if (status === undefined) {
    console.log(taskBase);
  } else {
    const newArr = [];
    taskBase.forEach((task) => {
      if (task.status === status) {
        newArr.push(task);
      }
    });
    console.log(newArr);
  }
};

module.exports = showTasks;
