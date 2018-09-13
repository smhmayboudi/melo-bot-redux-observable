import { Action } from "redux";
import { IStateYoutubeSearchList } from "./iStateYoutubeSearchList";

export interface IActionYoutubeSearchList extends Action<string> {
  youtubeSearchList: IStateYoutubeSearchList;
}