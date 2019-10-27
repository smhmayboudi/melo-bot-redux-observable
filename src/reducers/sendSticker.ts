import { IActionSendSticker } from "../../types/iActionSendSticker";
import { IStateSendSticker } from "../../types/iStateSendSticker";
import * as actions from "../actions";

const sendSticker: (
  state: IStateSendSticker | undefined,
  action: IActionSendSticker
) => IStateSendSticker = (
  state: IStateSendSticker | undefined = actions.sendSticker.initialState,
  action: IActionSendSticker
): IStateSendSticker => {
  switch (action.type) {
    case actions.sendSticker.SEND_STICKER_ERROR:
      return { error: action.sendSticker.error, query: state.query };
    case actions.sendSticker.SEND_STICKER_QUERY:
      return { query: action.sendSticker.query };
    case actions.sendSticker.SEND_STICKER_RESULT:
      return { query: state.query, result: action.sendSticker.result };
    default:
      return state;
  }
};

export { sendSticker };
