import { IAction } from "./iAction";
import { IStateShortenList } from "./iStateShortenList";

export interface IActionShortenList extends IAction {
  shortenList: IStateShortenList;
}
