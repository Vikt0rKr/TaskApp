const findUser = require('./findUser.js');
const init = require('../init.js');

const addUser = async (nameUser, surnameUser) => {
  const addUserInDb = async (DB) => {
    const creationDate = Date.now();
    const insertInDb = await DB.collection('users').insert({
      name: nameUser,
      surname: surnameUser,
      createdAt: creationDate,
      tasks: [],
    });
    if (insertInDb) console.log(`Created user ${nameUser} ${surnameUser}`);
  };
  const foundUser = await findUser(nameUser);
  if (foundUser === null) {
    await init(addUserInDb);
  } else {
    console.log(`User ${nameUser} already exists`);
  }
};

module.exports = addUser;
