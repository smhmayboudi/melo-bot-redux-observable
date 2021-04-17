import { IAction } from "./iAction";
import { IStateShortenReset } from "./iStateShortenReset";

export interface IActionShortenReset extends IAction {
  shortenReset: IStateShortenReset;
}
