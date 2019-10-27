import { IActionSendGame } from "../../types/iActionSendGame";
import { IStateSendGame } from "../../types/iStateSendGame";
import * as actions from "../actions";

const sendGame: (
  state: IStateSendGame | undefined,
  action: IActionSendGame
) => IStateSendGame = (
  state: IStateSendGame | undefined = actions.sendGame.initialState,
  action: IActionSendGame
): IStateSendGame => {
  switch (action.type) {
    case actions.sendGame.SEND_GAME_ERROR:
      return { error: action.sendGame.error, query: state.query };
    case actions.sendGame.SEND_GAME_QUERY:
      return { query: action.sendGame.query };
    case actions.sendGame.SEND_GAME_RESULT:
      return { query: state.query, result: action.sendGame.result };
    default:
      return state;
  }
};

export { sendGame };
