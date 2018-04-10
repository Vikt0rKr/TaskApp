const userBase = require('./userBase.js');

function findUser(name) {
  let user;
  userBase.forEach((users) => {
    if (users.name === name) {
      user = users;
    }
  });
  return user;
}

module.exports = findUser;
