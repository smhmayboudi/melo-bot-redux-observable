import { IActionGetGameHighScores } from "../../types/iActionGetGameHighScores";
import { IStateGetGameHighScores } from "../../types/iStateGetGameHighScores";
import * as actions from "../actions";

const getGameHighScores: (
  state: IStateGetGameHighScores | undefined,
  action: IActionGetGameHighScores
) => IStateGetGameHighScores = (
  state: IStateGetGameHighScores | undefined = actions.getGameHighScores
    .initialState,
  action: IActionGetGameHighScores
): IStateGetGameHighScores => {
  switch (action.type) {
    case actions.getGameHighScores.GET_GAME_HIGH_SCORES_ERROR:
      return { ...state, error: action.getGameHighScores.error };
    case actions.getGameHighScores.GET_GAME_HIGH_SCORES_QUERY:
      return { ...state, query: action.getGameHighScores.query };
    case actions.getGameHighScores.GET_GAME_HIGH_SCORES_RESULT:
      return { ...state, result: action.getGameHighScores.result };
    default:
      return state;
  }
};

export { getGameHighScores };
