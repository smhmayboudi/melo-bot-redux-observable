import { IActionSendGame } from "../../types/iActionSendGame";
import { IStateSendGame } from "../../types/iStateSendGame";

const initialState: IStateSendGame = {};

const SEND_GAME_ERROR = "SEND_GAME_ERROR";
const SEND_GAME_QUERY = "SEND_GAME_QUERY";
const SEND_GAME_RESULT = "SEND_GAME_RESULT";

const error: (sendGame: IStateSendGame) => IActionSendGame = (
  sendGame: IStateSendGame
): IActionSendGame => ({
  sendGame: { error: sendGame.error },
  type: SEND_GAME_ERROR
});
const query: (sendGame: IStateSendGame) => IActionSendGame = (
  sendGame: IStateSendGame
): IActionSendGame => ({
  sendGame: { query: sendGame.query },
  type: SEND_GAME_QUERY
});
const result: (sendGame: IStateSendGame) => IActionSendGame = (
  sendGame: IStateSendGame
): IActionSendGame => ({
  sendGame: { result: sendGame.result },
  type: SEND_GAME_RESULT
});

export {
  initialState,
  SEND_GAME_ERROR,
  SEND_GAME_QUERY,
  SEND_GAME_RESULT,
  error,
  query,
  result
};
