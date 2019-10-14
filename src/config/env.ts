const getter: (key: string, type: string) => string = (
  key: string,
  type: string
): string => {
  const value: string | undefined = process.env[key];
  if (["number"].indexOf(type) > -1) {
    if (value === undefined || isNaN(parseInt(value, 10))) {
      throw new Error(`{ [${key}: string]: ${type} }`);
    }

    return value;
  }
  if (["string"].indexOf(type) > -1) {
    if (value === undefined) {
      throw new Error(`{ [${key}: string]: ${type} }`);
    }

    return value;
  }

  return "";
};

const BOT_TOKEN: string = getter("BOT_TOKEN", "string");
const HOST: string = getter("HOST", "string");
const KEY: string = getter("KEY", "string");
const NODE_ENV: string = getter("NODE_ENV", "string");
const PORT: number = parseInt(getter("PORT", "number"), 10);

export { BOT_TOKEN, HOST, KEY, NODE_ENV, PORT };
