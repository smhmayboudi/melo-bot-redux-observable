import { IAction } from "./iAction";
import { IStateSendSticker } from "./iStateSendSticker";

export interface IActionSendSticker extends IAction {
  sendSticker: IStateSendSticker;
}
