const init = require('../init.js');
const convertFromBSON = require('../convertFromBSON.js');


const searchForTask = async (titleTask) => {
  let result = null;
  const findInDB = async (DB) => {
    const foundTask = await DB.collection('tasks').find({ title: titleTask }).toArray();
    if (foundTask) result = await convertFromBSON(foundTask);
    if (result.length === 0) result = null;
  };
  await init(findInDB);
  return result;
};

module.exports = searchForTask;
