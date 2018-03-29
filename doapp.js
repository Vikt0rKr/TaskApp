let userBase = new Array();
let taskBase = new Array();

let User = function(name, surname) {
	this.name = name;
	this.surname = surname;
	this.createdAt = Date.now();
	this.tasks = [];
};

//дата неправильно конвертируется в таймстамп!!! переделать!!!
let Task = function(from, title, description, deadline, responsible) {
	this.from = from;

	if(title.length > 20) {
		this.title = title.substring(0, 20);
	} else {
		this.title = title;
	}

	if(description.length > 200) {
		this.description = description.substring(0, 200);
	} else {
		this.description = description;
	}

	let splat = deadline.split('-').reverse().join('-');
	this.deadline = Date.parse(splat);

	if(responsible == undefined) {
		this.responsible = from;
	} else {
		this.responsible = responsible;
	}

	this.status = ('Wait');
};

let findUser = (name) => {
	for (users of userBase) {
		if(users['name'] == name) {
			return users;
		}
	}
};

let searchForTask = (title) => {
	for(task of taskBase) {
		if(task['title'] == title) {
			return task;
		}
	}
};

let addUser = (name, surname) => {
	if(findUser(name) == undefined) {
		userBase.push(new User(name, surname));
		console.log(`Added user ${name} ${surname}`);
	} else {
		console.log(`User ${name} ${surname} already exists.`);
	}
};

let addTask = (from, title, description, deadline, responsible) => {
	if(searchForTask(title) == undefined) {
		let newTask = new Task(from, title, description, deadline, responsible);
		taskBase.push(newTask);
		for(user of userBase) {
			if(user['name'] == newTask['responsible']) {
				user['tasks'].push(newTask);
			}
		}
		console.log(`Added task ${title}`);
	} else {
		console.log(`Cannot add task ${title}`);
	}
};

let setResponsible = (title, responsible) => {
	if(findUser(responsible) == undefined || searchForTask(title) == undefined) {
		console.log('Something is wrong. Check if the user or task really exists.')
	} else {
		let task = searchForTask(title);
		let userTemp = task['responsible'];
		for(user of userBase) {
			if(user['name'] == task['responsible']) {
				for(tsk in user['tasks']) {
					if(user['tasks'][tsk] == task) {
						user['tasks'].splice(tsk, 1);
					}
				}
				task['responsible'] = responsible;
			} 
		}
		for(user1 of userBase) {
			if(user1['name'] == task['responsible']) {
				user1['tasks'].push(task);
		}
	    }
	    console.log(`Responsibility for the task: ${title} changed from ${userTemp} to ${task['responsible']}`);
	}
};

let setDeadline = (title, newDeadline) => {
	for(task of taskBase) {
		if(task['title'] == title) {
			let tempDeadline = task['deadline'];
			let splat = newDeadline.split('-').reverse().join('-');
			let newDeadl = Date.parse(splat);
			task['deadline'] = newDeadl;

			let dateFirst = new Date(tempDeadline).toISOString().substring(0, 10).split('-').reverse().join('-');
			let dateSecond = new Date(newDeadl).toISOString().substring(0, 10).split('-').reverse().join('-');
			console.log(`Deadline for task: ${title} changed from ${dateFirst} to ${dateSecond}`);
		} else {
			console.log('There is no such task in the app');
		}
	}
};

let setStatus = (title, status) => {
	for(task of taskBase) {
		if(task['title'] == title) {
			let tempStatus = task['status'];
			let wrongStatus = false;

			switch(status) {
				case 'Wait':
				    task['status'] = 'Wait';
				    break;
				case 'In Progress':
				    task['status'] = 'In Progress';
				    break;
				case 'Done':
				    task['status'] = 'Done';
				    break;
				default:
				    console.log('Wrong status. Appropriate ones are: Wait / In Progress / Done .');
				    wrongStatus = true;
				    break;
			}

			if(wrongStatus) {
				console.log(`Failed to change status due to incorrect form. Status of ${title} is: ${tempStatus}`);
			} else {
				console.log(`Status of task: ${title} changed from ${tempStatus} to ${status}`);
			}
		} else {
			console.log('There is no such task in the app.');
		}
	}
};

let showUsers = () => {
	let newArr = [];
	for(each of userBase) {
		let user = function(name, surname, registration, taskamount) {
			this.name = name; 
			this.surname = surname; 
			this.registration = registration; 
			this.taskamount = taskamount;
		}
		let dati = (new Date(each['createdAt'])).toISOString().substring(0, 10).split('-').reverse().join('-');
		newArr.push(new user(each['name'], each['surname'], dati, each['tasks'].length ));
	}
	console.log(newArr);
};

let showTasks = (status) => {
	if(status == undefined) {
		console.log(taskBase);
	} else {
		let newArr = [];
	    for(task of taskBase) {
		if(task['status'] == status) {
			newArr.push(task);
		}
	}
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
showTasks('Wait');








