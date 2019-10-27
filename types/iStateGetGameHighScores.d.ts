import { IStateGetGameHighScoresQuery } from "./iStateGetGameHighScoresQuery";
import { IGameHighScore } from "./telegramBot/games/iGameHighScore";

export interface IStateGetGameHighScores {
  error?: any;
  query?: IStateGetGameHighScoresQuery;
  result?: IGameHighScore[];
}
