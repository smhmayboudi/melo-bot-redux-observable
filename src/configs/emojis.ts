import debug from "debug";

import { IEmoji } from "../../types/iEmoji.js";

import emojis from "./emojis.json";

const appDebug: debug.IDebugger = debug("app:config:emoji");

const findByCode: (code: string) => IEmoji = (code: string): IEmoji => {
  appDebug("findByCode", code);
  const emoji: IEmoji | undefined = emojis.find(
    (value: IEmoji) => value.codes.indexOf(code) > -1
  );

  return emoji !== undefined
    ? emoji
    : {
        codes: "1F534",
        char: "🔴",
        name: "E2.0 red circle",
        category: "Symbols (geometric)"
      };
};

const findByName: (name: string) => IEmoji = (name: string): IEmoji => {
  appDebug("findByName", name);
  const emoji: IEmoji | undefined = emojis.find(
    (value: IEmoji) => value.name.indexOf(name) > -1
  );

  return emoji !== undefined
    ? emoji
    : {
        codes: "1F534",
        char: "🔴",
        name: "E2.0 red circle",
        category: "Symbols (geometric)"
      };
};

export { findByCode, findByName };
