// converts data from BSON to JSON, then converts it into accessible format
const convertFromBSON = async (data) => {
  const humanData = await JSON.parse(JSON.stringify(data));
  return humanData;
};

module.exports = convertFromBSON;
