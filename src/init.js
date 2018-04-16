const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'todo';

// connects us to DB (mongoDb in this case), let us perform action and then closes connection
const init = async (action) => {
  const mongo = await MongoClient.connect(url);
  const dbNew = await mongo.db(dbName);
  await action(dbNew);
  await mongo.close();
};

module.exports = init;
