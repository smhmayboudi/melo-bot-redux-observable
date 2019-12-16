import { IAction } from "./iAction";
import { IStateSendGame } from "./iStateSendGame";

export interface IActionSendGame extends IAction {
  sendGame: IStateSendGame;
}
