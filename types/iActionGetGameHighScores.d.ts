import { IAction } from "./iAction";
import { IStateGetGameHighScores } from "./iStateGetGameHighScores";

export interface IActionGetGameHighScores extends IAction {
  getGameHighScores: IStateGetGameHighScores;
}
