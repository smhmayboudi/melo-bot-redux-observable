module.exports = async function() {
  console.log("Teardown MongoDB");
  await global.__MONGOD__.stop();
};