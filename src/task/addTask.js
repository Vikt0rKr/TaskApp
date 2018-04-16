const searchForTask = require('./searchTask.js');
const init = require('../init.js');

const addTask = async (fromWho, title, description, deadline, responsible) => {
  let newTitle = title;
  if (title.length > 20) {
    newTitle = title.substring(0, 20);
  }
  const addNew = async (DB) => {
    let newDescription = description;
    if (description.length > 200) {
      newDescription = description.substring(0, 200);
    }
    const splatNumbers = deadline.split('-').reverse().join('-');
    const newDeadline = new Date(splatNumbers).getTime();
    let newResponsible = responsible;
    if (responsible === undefined) {
      newResponsible = fromWho;
    }
    const newStatus = 'Wait';
    const insertIn = await DB.collection('tasks').insert({
      from: fromWho,
      title: newTitle,
      description: newDescription,
      deadline: newDeadline,
      responsible: newResponsible,
      status: newStatus,
    });
    if (insertIn) {
      await DB.collection('users').update({ name: newResponsible }, { $push: { tasks: newTitle } });
      console.log(`Created task ${newTitle}`);
    }
  };
  const found = await searchForTask(title);
  if (found === null) {
    await init(addNew);
  } else {
    console.log(`Task ${newTitle} already exists`);
  }
};

module.exports = addTask;
