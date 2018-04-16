const init = require('../init.js');
const convertFromBSON = require('../convertFromBSON.js');

const showTasks = async (statusTask) => {
  const showTaskList = async (DB) => {
    let allTasksBSON;
    if (statusTask === undefined) {
      allTasksBSON = await DB.collection('tasks').find().toArray();
    } else {
      allTasksBSON = await DB.collection('tasks').find({ status: statusTask }, { multi: true }).toArray();
    }
    const allTasksHumanFormat = await convertFromBSON(allTasksBSON);
    await allTasksHumanFormat.forEach((task, index) => {
      const taskNumber = index + 1;
      const convertedDeadline = new Date(task.deadline).toISOString().substring(0, 10).split('-');
      const deadlineToShow = convertedDeadline.reverse().join('-');
      console.log(taskNumber, ' - ', task.title, ' from ', task.from, ', description: ', task.description, ', deadline: ', deadlineToShow, ', responsible: ', task.responsible, ', status: ', task.status);
    });
  };
  await init(showTaskList);
};

module.exports = showTasks;
