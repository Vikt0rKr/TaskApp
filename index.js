const {
  searchTask, addTask, setDeadline, setStatus, showTasks, setResponsible,
} = require('./src/task');

const {
  findUser, addUser, showUsers,
} = require('./src/user');

(async () => {
  await addUser('Vasya', 'Pupkin');
  await addUser('Masha', 'Krasnaya');
  await addUser('Petr', 'Ivanenko');
  await addUser('Ivan', 'Grozniy');

  await addTask('Masha', 'homework', 'do the homework for his little brother', '24-05-2018', 'Ivan');

  await setResponsible('homework', 'Vasya');
  await setDeadline('homework', '25-05-2018');
  await setStatus('homework', 'In Progress');

  await showUsers();
  await showTasks('In Progress');
})();