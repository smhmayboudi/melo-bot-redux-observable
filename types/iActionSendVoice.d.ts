import { IAction } from "./iAction";
import { IStateSendVoice } from "./iStateSendVoice";

export interface IActionSendVoice extends IAction {
  sendVoice: IStateSendVoice;
}
