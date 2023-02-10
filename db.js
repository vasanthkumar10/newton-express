module.exports.getCustomerData = function (id) {
  console.log("Reading the data from the database");
  return { id: id, points: 15 };
};
