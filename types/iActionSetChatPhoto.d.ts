import { IAction } from "./iAction";
import { IStateSetChatPhoto } from "./iStateSetChatPhoto";

export interface IActionSetChatPhoto extends IAction {
  setChatPhoto: IStateSetChatPhoto;
}
