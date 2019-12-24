import { IAction } from "./iAction";
import { IStateYoutubeSearchList } from "./iStateYoutubeSearchList";

export interface IActionYoutubeSearchList extends IAction {
  youtubeSearchList: IStateYoutubeSearchList;
}
