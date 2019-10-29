import debug from "debug";

import { IEmoji } from "../../types/iEmoji.js";

import emojis from "./emojis.json";

const appDebug: debug.IDebugger = debug("app:config:emoji");

const findByCode: (code: string) => IEmoji = (code: string): IEmoji => {
  appDebug("findByCode", code);
  const emoji: IEmoji | undefined = emojis.find((value: IEmoji) =>
    value.codes.includes(code)
  );

  return emoji !== undefined
    ? emoji
    : {
        category: "Symbols (geometric)",
        char: "🔴",
        codes: "1F534",
        name: "E2.0 red circle"
      };
};

const findByName: (name: string) => IEmoji = (name: string): IEmoji => {
  appDebug("findByName", name);
  const emoji: IEmoji | undefined = emojis.find((value: IEmoji) =>
    value.name.includes(name)
  );

  return emoji !== undefined
    ? emoji
    : {
        category: "Symbols (geometric)",
        char: "🔴",
        codes: "1F534",
        name: "E2.0 red circle"
      };
};

export { findByCode, findByName };
