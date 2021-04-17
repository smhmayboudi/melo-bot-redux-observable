import { IAction } from "./iAction";
import { IStateSendAudio } from "./iStateSendAudio";

export interface IActionSendAudio extends IAction {
  sendAudio: IStateSendAudio;
}
