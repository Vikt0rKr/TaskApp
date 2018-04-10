const userBase = require('./userBase.js');

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

module.exports = showUsers;
