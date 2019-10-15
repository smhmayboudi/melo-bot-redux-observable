const NodeEnvironment = require("jest-environment-node");
const path = require("path");
const fs = require("fs");
const configPath = path.join(__dirname, "globalConfig.json");

module.exports = class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log("Setup MongoDB Test Environment");

    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

    this.global.__MONGO_URI__ = config.mongoUri;
    this.global.__MONGO_DB_NAME__ = config.mongoDBName;

    await super.setup();
  }

  async teardown() {
    console.log("Teardown MongoDB Test Environment");

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};
