import { Action } from "redux";
import { IStateSendMessage } from "./iStateSendMessage";

export interface IActionSendMessage extends Action<string> {
  sendMessage: IStateSendMessage;
}
