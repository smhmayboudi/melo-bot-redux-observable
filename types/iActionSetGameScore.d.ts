import { Action } from "redux";

import { IStateSetGameScore } from "./iStateSetGameScore";

export interface IActionSetGameScore extends Action<string> {
  setGameScore: IStateSetGameScore;
}
