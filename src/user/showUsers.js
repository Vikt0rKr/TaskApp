const init = require('../init.js');
const convertFromBSON = require('../convertFromBSON.js');

const showUsers = async () => {
  const showUserList = async (DB) => {
    const findAllUsers = await DB.collection('users').find().toArray();
    const allUsersConverted = await convertFromBSON(findAllUsers);
    await allUsersConverted.forEach((user, index) => {
      const userNumber = index + 1;
      const convertRegDate = (new Date(user.createdAt)).toISOString().substring(0, 10).split('-');
      const convertedCreatedAt = convertRegDate.reverse().join('-');
      console.log(userNumber, ' - ', user.name, ' ', user.surname, ', created at: ', convertedCreatedAt, ', tasks: ', user.tasks.length);
    });
  };
  await init(showUserList);
};

module.exports = showUsers;
