const init = require('../init.js');
const searchTask = require('./searchTask.js');
const convertFromBSON = require('../convertFromBSON.js');

const setStatus = async (titleTask, statusTask) => {
  const setTaskStatusInDb = async (DB) => {
    const previousStatus = await DB.collection('tasks').find({ title: titleTask }).toArray();
    const previousStatusHumanFormat = await convertFromBSON(previousStatus);
    const preStatus = previousStatusHumanFormat[0].status;
    switch (statusTask) {
      case 'Wait':
        await DB.collection('tasks').update({ title: titleTask }, { $set: { status: 'Wait' } });
        console.log(`Changed status of the task: ${titleTask} from ${preStatus} to ${statusTask}`);
        break;
      case 'In Progress':
        await DB.collection('tasks').update({ title: titleTask }, { $set: { status: 'In Progress' } });
        console.log(`Changed status of the task: ${titleTask} from ${preStatus} to ${statusTask}`);
        break;
      case 'Done':
        await DB.collection('tasks').update({ title: titleTask }, { $set: { status: 'Done' } });
        console.log(`Changed status of the task: ${titleTask} from ${preStatus} to ${statusTask}`);
        break;
      default:
        console.log('Wrong status! Use these forms, please: Wait / In Progress / Done');
    }
  };
  const foundTask = await searchTask(titleTask);
  if (foundTask === null) {
    console.log(`Have not found task named ${titleTask}`);
  } else {
    await init(setTaskStatusInDb);
  }
};

module.exports = setStatus;
