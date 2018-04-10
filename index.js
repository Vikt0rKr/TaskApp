const {
  Task, taskBase, searchTask, addTask, setDeadline, setStatus, showTasks, setResponsible,
} = require('./src/task');

const {
  user, userBase, findUser, addUser, showUsers,
} = require('./src/user');

addUser('Vasya', 'Pupkin');
addUser('Masha', 'Krasnaya');
addUser('Petr', 'Ivanenko');
addUser('Ivan', 'Grozniy');

addTask('Masha', 'homework', 'do the homework for his little brother', '24-05-2018', 'Ivan');

setResponsible('homework', 'Vasya');
setDeadline('homework', '25-05-2018');
setStatus('homework', 'In Progress');

showUsers();
showTasks('In Progress');
