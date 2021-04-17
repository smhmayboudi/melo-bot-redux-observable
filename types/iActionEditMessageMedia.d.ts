import { IAction } from "./iAction";
import { IStateEditMessageMedia } from "./iStateEditMessageMedia";

export interface IActionEditMessageMedia extends IAction {
  editMessageMedia: IStateEditMessageMedia;
}
