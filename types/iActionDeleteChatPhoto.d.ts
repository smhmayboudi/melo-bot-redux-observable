import { IAction } from "./iAction";
import { IStateDeleteChatPhoto } from "./iStateDeleteChatPhoto";

export interface IActionDeleteChatPhoto extends IAction {
  deleteChatPhoto: IStateDeleteChatPhoto;
}
