module.exports = async function() {
  console.log("Teardown MongoDB");
  await global.__MONGODB__.stop();
};