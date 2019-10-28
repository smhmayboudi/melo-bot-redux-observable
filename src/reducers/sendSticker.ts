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
      return { ...state, error: action.sendSticker.error };
    case actions.sendSticker.SEND_STICKER_QUERY:
      return { ...state, query: action.sendSticker.query };
    case actions.sendSticker.SEND_STICKER_RESULT:
      return { ...state, result: action.sendSticker.result };
    default:
      return state;
  }
};

export { sendSticker };
