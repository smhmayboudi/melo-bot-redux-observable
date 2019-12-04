import { Action } from "redux";

import { IStateShortenList } from "./iStateShortenList";

export interface IActionShortenList extends Action<string> {
  shortenList: IStateShortenList;
}
