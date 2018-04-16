const findUser = require('../user/findUser.js');
const searchTask = require('../task/searchTask.js');
const init = require('../init.js');
const convertFromBSON = require('../convertFromBSON.js');

const setResponsible = async (titleTask, responsibleName) => {
  const settingResponsibleInDb = async (DB) => {
    const previousUserResponsible = await DB.collection('users').find({ tasks: titleTask }).toArray();
    const convertedResult = await convertFromBSON(previousUserResponsible);
    const previousResponsibleName = convertedResult[0].name;
    await DB.collection('tasks').update({ title: titleTask }, { $set: { responsible: responsibleName } });
    await DB.collection('users').update({ tasks: titleTask }, { $pull: { tasks: titleTask } });
    await DB.collection('users').update({ name: responsibleName }, { $push: { tasks: titleTask } });
    console.log(`Responsibility for the task: ${titleTask} changed from ${previousResponsibleName} to ${responsibleName}`);
  };
  const foundResponsible = await findUser(responsibleName);
  const foundTask = await searchTask(titleTask);
  if (foundResponsible !== null && foundTask !== null) {
    await init(settingResponsibleInDb);
  } else {
    console.log('Something is wrong. Check if the user or task really exists.');
  }
};

module.exports = setResponsible;
