import { Action } from "redux";

import { IStateDeleteChatPhoto } from "./iStateDeleteChatPhoto";

export interface IActionDeleteChatPhoto extends Action<string> {
  deleteChatPhoto: IStateDeleteChatPhoto;
}
