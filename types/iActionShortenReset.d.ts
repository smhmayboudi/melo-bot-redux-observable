import { Action } from "redux";

import { IStateShortenReset } from "./iStateShortenReset";

export interface IActionShortenReset extends Action<string> {
  shortenReset: IStateShortenReset;
}
