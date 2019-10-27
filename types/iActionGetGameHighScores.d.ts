import { Action } from "redux";

import { IStateGetGameHighScores } from "./iStateGetGameHighScores";

export interface IActionGetGameHighScores extends Action<string> {
  getGameHighScores: IStateGetGameHighScores;
}
