const path = require("path");
const fs = require("fs");
const MongodbMemoryServer = require("mongodb-memory-server");
const configPath = path.join(__dirname, "globalConfig.json");

const mongodb = new MongodbMemoryServer.default({
  autoStart: false,
  binary: {
    skipMD5: true
  },
  instance: {
    dbName: "melodio"
  }
});

module.exports = async function() {
  const mongoConfig = {
    mongoDBName: "melodio",
    mongoUri: await mongodb.getConnectionString()
  };

  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(configPath, JSON.stringify(mongoConfig));
  console.log("Config is written");

  // Set reference to mongodb in order to close the server during teardown.
  global.__MONGOD__ = mongodb;
  process.env.MONGO_URL = mongoConfig.mongoUri;
};