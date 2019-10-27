import { Action } from "redux";

import { IStateSetChatPhoto } from "./iStateSetChatPhoto";

export interface IActionSetChatPhoto extends Action<string> {
  setChatPhoto: IStateSetChatPhoto;
}
