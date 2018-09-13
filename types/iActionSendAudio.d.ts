import { Action } from "redux";
import { IStateSendAudio } from "./iStateSendAudio";

export interface IActionSendAudio extends Action<string> {
  sendAudio: IStateSendAudio;
}