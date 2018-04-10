const taskBase = require('./taskBase.js');

const setDeadline = (title, newDeadline) => {
  taskBase.forEach((task) => {
    const taskToAssign = task;
    if (task.title === title) {
      const tempDeadline = task.deadline;
      const splat = newDeadline.split('-').reverse().join('-');
      const newDeadl = Date.parse(splat);
      taskToAssign.deadline = newDeadl;
      const dateFirst = new Date(tempDeadline).toISOString().substring(0, 10).split('-');
      const first = dateFirst.reverse().join('-');
      const dateSecond = new Date(taskToAssign.deadline).toISOString().substring(0, 10).split('-');
      const second = dateSecond.reverse().join('-');
      console.log(`Deadline for task: ${title} changed from ${first} to ${second}`);
    } else {
      console.log('There is no such task in the app');
    }
  });
};

module.exports = setDeadline;
