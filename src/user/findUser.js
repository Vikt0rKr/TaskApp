const init = require('../init.js');
const convertFromBSON = require('../convertFromBSON.js');

const findUser = async (nameUser) => {
  let result = null;
  const findInDb = async (DB) => {
    const foundUser = await DB.collection('users').find({ name: nameUser }).toArray();
    if (foundUser) result = await convertFromBSON(foundUser);
    if (result.length === 0) result = null;
  };
  await init(findInDb);
  return result;
};

module.exports = findUser;
