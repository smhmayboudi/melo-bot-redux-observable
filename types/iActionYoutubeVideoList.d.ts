import { IAction } from "./iAction";
import { IStateYoutubeVideoList } from "./iStateYoutubeVideoList";

export interface IActionYoutubeVideoList extends IAction {
  youtubeVideoList: IStateYoutubeVideoList;
}
