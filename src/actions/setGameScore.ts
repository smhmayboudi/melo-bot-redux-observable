import { IActionSetGameScore } from "../../types/iActionSetGameScore";
import { IStateSetGameScore } from "../../types/iStateSetGameScore";

const initialState: IStateSetGameScore = {};

const SET_GAME_SCORE_ERROR = "SET_GAME_SCORE_ERROR";
const SET_GAME_SCORE_QUERY = "SET_GAME_SCORE_QUERY";
const SET_GAME_SCORE_RESULT = "SET_GAME_SCORE_RESULT";

const error: (setGameScore: IStateSetGameScore) => IActionSetGameScore = (
  setGameScore: IStateSetGameScore
): IActionSetGameScore => ({
  setGameScore: { error: setGameScore.error },
  type: SET_GAME_SCORE_ERROR
});
const query: (setGameScore: IStateSetGameScore) => IActionSetGameScore = (
  setGameScore: IStateSetGameScore
): IActionSetGameScore => ({
  setGameScore: { query: setGameScore.query },
  type: SET_GAME_SCORE_QUERY
});
const result: (setGameScore: IStateSetGameScore) => IActionSetGameScore = (
  setGameScore: IStateSetGameScore
): IActionSetGameScore => ({
  setGameScore: { result: setGameScore.result },
  type: SET_GAME_SCORE_RESULT
});

export {
  initialState,
  SET_GAME_SCORE_ERROR,
  SET_GAME_SCORE_QUERY,
  SET_GAME_SCORE_RESULT,
  error,
  query,
  result
};
