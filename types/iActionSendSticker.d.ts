import { Action } from "redux";

import { IStateSendSticker } from "./iStateSendSticker";

export interface IActionSendSticker extends Action<string> {
  sendSticker: IStateSendSticker;
}
