const userBase = require('./userBase.js');
const findUser = require('./findUser.js');
const searchForTask = require('../task/searchTask.js');

const setResponsible = (title, responsible) => {
  if (findUser(responsible) === undefined || searchForTask(title) === undefined) {
    console.log('Something is wrong. Check if the user or task really exists.');
  } else {
    const task = searchForTask(title);
    const userTemp = task.responsible;
    userBase.forEach((user) => {
      if (user.name === task.responsible) {
        user.tasks.forEach((tsk) => {
          if (tsk === task) {
            user.tasks.splice(tsk, 1);
          }
        });
        task.responsible = responsible;
      }
    });
    userBase.forEach((user1) => {
      if (user1.name === task.responsible) {
        user1.tasks.push(task);
      }
    });
    console.log(`Responsibility for the task: ${title} changed from ${userTemp} to ${task.responsible}`);
  }
};

module.exports = setResponsible;
