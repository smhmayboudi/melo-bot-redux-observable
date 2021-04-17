import { IActionSendPhoto } from "../../types/iActionSendPhoto";
import { IStateSendPhoto } from "../../types/iStateSendPhoto";
import * as actions from "../actions";

const sendPhoto: (
  state: IStateSendPhoto | undefined,
  action: IActionSendPhoto
) => IStateSendPhoto = (
  state: IStateSendPhoto | undefined = actions.sendPhoto.initialState,
  action: IActionSendPhoto
): IStateSendPhoto => {
  switch (action.type) {
    case actions.sendPhoto.SEND_PHOTO_ERROR:
      return { ...state, error: action.sendPhoto.error };
    case actions.sendPhoto.SEND_PHOTO_QUERY:
      return { ...state, query: action.sendPhoto.query };
    case actions.sendPhoto.SEND_PHOTO_RESULT:
      return { ...state, result: action.sendPhoto.result };
    default:
      return state;
  }
};

export { sendPhoto };
