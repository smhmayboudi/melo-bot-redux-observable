import { Action } from "redux";

import { IStateSendGame } from "./iStateSendGame";

export interface IActionSendGame extends Action<string> {
  sendGame: IStateSendGame;
}
