const taskBase = require('./taskBase.js');

const setStatus = (title, status) => {
  taskBase.forEach((task) => {
    const statusForAssign = task;
    if (task.title === title) {
      const tempStatus = task.status;
      let wrongStatus = false;
      switch (status) {
        case 'Wait':
          statusForAssign.status = 'Wait';
          break;
        case 'In Progress':
          statusForAssign.status = 'In Progress';
          break;
        case 'Done':
          statusForAssign.status = 'Done';
          break;
        default:
          console.log('Wrong status. Appropriate ones are: Wait / In Progress / Done .');
          wrongStatus = true;
          break;
      }
      if (wrongStatus) {
        console.log(`Failed to change status due to incorrect form. Status of ${title} is: ${tempStatus}`);
      } else {
        console.log(`Status of task: ${title} changed from ${tempStatus} to ${statusForAssign.status}`);
      }
    } else {
      console.log('There is no such task in the app.');
    }
  });
};

module.exports = setStatus;
