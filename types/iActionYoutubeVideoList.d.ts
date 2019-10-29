import { Action } from "redux";
import { IStateYoutubeVideoList } from "./iStateYoutubeVideoList";

export interface IActionYoutubeVideoList extends Action<string> {
  youtubeVideoList: IStateYoutubeVideoList;
}
