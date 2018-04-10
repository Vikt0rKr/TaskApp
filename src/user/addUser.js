const User = require('./user.js');
const userBase = require('./userBase.js');
const findUser = require('./findUser.js');

const addUser = (name, surname) => {
  if (findUser(name) === undefined) {
    userBase.push(new User(name, surname));
    console.log(`Added user ${name} ${surname}`);
  } else {
    console.log(`User ${name} ${surname} already exists.`);
  }
};

module.exports = addUser;
