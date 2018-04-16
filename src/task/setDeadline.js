const init = require('../init.js');
const searchTask = require('./searchTask.js');
const convertFromBSON = require('../convertFromBSON.js');

const setDeadline = async (titleTask, newDeadline) => {
  const changeDeadline = async (DB) => {
    const neededTask = await DB.collection('tasks').find({ title: titleTask }).toArray();
    const convertedTask = await convertFromBSON(neededTask);
    const taskDeadline = convertedTask[0].deadline;
    const splitNewDeadline = newDeadline.split('-').reverse().join('-');
    const newDeadl = new Date(splitNewDeadline).getTime();
    const previousDeadline = new Date(taskDeadline).toISOString().substring(0, 10).split('-');
    const firstDeadline = previousDeadline.reverse().join('-');
    const modifyDeadline = await DB.collection('tasks').update({ title: titleTask }, { $set: { deadline: newDeadl } });
    if (modifyDeadline) console.log(`Deadline for task: ${titleTask} changed from ${firstDeadline} to ${newDeadline}`);
  };
  const foundTask = await searchTask(titleTask);
  if (foundTask) init(changeDeadline);
  else console.log(`Have not found task named ${titleTask}`);
};

module.exports = setDeadline;
