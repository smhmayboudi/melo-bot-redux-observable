import { IAction } from "./iAction";
import { IStateSetGameScore } from "./iStateSetGameScore";

export interface IActionSetGameScore extends IAction {
  setGameScore: IStateSetGameScore;
}
