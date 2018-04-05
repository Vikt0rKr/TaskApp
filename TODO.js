const userBase = [];
const taskBase = [];

const User = function (name, surname) {
  this.name = name;
  this.surname = surname;
  this.createdAt = Date.now();
  this.tasks = [];
};

const Task = function (from, title, description, deadline, responsible) {
  this.from = from;

  if (title.length > 20) {
    this.title = title.substring(0, 20);
  } else {
    this.title = title;
  }

  if (description.length > 200) {
    this.description = description.substring(0, 200);
  } else {
    this.description = description;
  }

  const splat = deadline.split('-').reverse().join('-');
  this.deadline = Date.parse(splat);
  if (responsible === undefined) {
    this.responsible = from;
  } else {
    this.responsible = responsible;
  }

  this.status = 'Wait';
};

function findUser(name) {
  let user;
  userBase.forEach((users) => {
    if (users.name === name) {
      user = users;
    }
  });
  return user;
}

function searchForTask(title) {
  let taskNew;
  taskBase.forEach((task) => {
    if (task.title === title) {
      taskNew = task;
    }
  });
  return taskNew;
}

const addUser = (name, surname) => {
  if (findUser(name) === undefined) {
    userBase.push(new User(name, surname));
    console.log(`Added user ${name} ${surname}`);
  } else {
    console.log(`User ${name} ${surname} already exists.`);
  }
};

const addTask = (from, title, description, deadline, responsible) => {
  if (searchForTask(title) === undefined) {
    const newTask = new Task(from, title, description, deadline, responsible);
    taskBase.push(newTask);
    userBase.forEach((user) => {
      if (user.name === newTask.responsible) {
        user.tasks.push(newTask);
      }
    });
    console.log(`Added task ${title}`);
  } else {
    console.log(`Cannot add task ${title}`);
  }
};

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

const showUsers = () => {
  const newArr = [];
  userBase.forEach((eachUser) => {
    const AnotherUser = function (name, surname, registration, taskamount) {
      this.name = name;
      this.surname = surname;
      this.registration = registration;
      this.taskamount = taskamount;
    };
    const dati = (new Date(eachUser.createdAt)).toISOString().substring(0, 10).split('-');
    const finalDati = dati.reverse().join('-');
    newArr.push(new AnotherUser(eachUser.name, eachUser.surname, finalDati, eachUser.tasks.length));
  });
  console.log(newArr);
};

const showTasks = (status) => {
  if (status === undefined) {
    console.log(taskBase);
  } else {
    const newArr = [];
    taskBase.forEach((task) => {
      if (task.status === status) {
        newArr.push(task);
      }
    });
    console.log(newArr);
  }
};


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
