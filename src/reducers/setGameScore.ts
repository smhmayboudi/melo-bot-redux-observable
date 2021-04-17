import { IActionSetGameScore } from "../../types/iActionSetGameScore";
import { IStateSetGameScore } from "../../types/iStateSetGameScore";
import * as actions from "../actions";

const setGameScore: (
  state: IStateSetGameScore | undefined,
  action: IActionSetGameScore
) => IStateSetGameScore = (
  state: IStateSetGameScore | undefined = actions.setGameScore.initialState,
  action: IActionSetGameScore
): IStateSetGameScore => {
  switch (action.type) {
    case actions.setGameScore.SET_GAME_SCORE_ERROR:
      return { ...state, error: action.setGameScore.error };
    case actions.setGameScore.SET_GAME_SCORE_QUERY:
      return { ...state, query: action.setGameScore.query };
    case actions.setGameScore.SET_GAME_SCORE_RESULT:
      return { ...state, result: action.setGameScore.result };
    default:
      return state;
  }
};

export { setGameScore };
