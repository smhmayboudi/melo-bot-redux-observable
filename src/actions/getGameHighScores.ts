import { IActionGetGameHighScores } from "../../types/iActionGetGameHighScores";
import { IStateGetGameHighScores } from "../../types/iStateGetGameHighScores";

const initialState: IStateGetGameHighScores = {};

const GET_GAME_HIGH_SCORES_ERROR = "GET_GAME_HIGH_SCORES_ERROR";
const GET_GAME_HIGH_SCORES_QUERY = "GET_GAME_HIGH_SCORES_QUERY";
const GET_GAME_HIGH_SCORES_RESULT = "GET_GAME_HIGH_SCORES_RESULT";

const error: (
  getGameHighScores: IStateGetGameHighScores
) => IActionGetGameHighScores = (
  getGameHighScores: IStateGetGameHighScores
): IActionGetGameHighScores => ({
  getGameHighScores: {
    error: getGameHighScores.error
  },
  type: GET_GAME_HIGH_SCORES_ERROR
});
const query: (
  getGameHighScores: IStateGetGameHighScores
) => IActionGetGameHighScores = (
  getGameHighScores: IStateGetGameHighScores
): IActionGetGameHighScores => ({
  getGameHighScores: {
    query: getGameHighScores.query
  },
  type: GET_GAME_HIGH_SCORES_QUERY
});
const result: (
  getGameHighScores: IStateGetGameHighScores
) => IActionGetGameHighScores = (
  getGameHighScores: IStateGetGameHighScores
): IActionGetGameHighScores => ({
  getGameHighScores: {
    result: getGameHighScores.result
  },
  type: GET_GAME_HIGH_SCORES_RESULT
});

export {
  initialState,
  GET_GAME_HIGH_SCORES_ERROR,
  GET_GAME_HIGH_SCORES_QUERY,
  GET_GAME_HIGH_SCORES_RESULT,
  error,
  query,
  result
};
