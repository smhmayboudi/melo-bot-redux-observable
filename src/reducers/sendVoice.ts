import { IActionSendVoice } from "../../types/iActionSendVoice";
import { IStateSendVoice } from "../../types/iStateSendVoice";
import * as actions from "../actions";

const sendVoice: (
  state: IStateSendVoice | undefined,
  action: IActionSendVoice
) => IStateSendVoice = (
  state: IStateSendVoice | undefined = actions.sendVoice.initialState,
  action: IActionSendVoice
): IStateSendVoice => {
  switch (action.type) {
    case actions.sendVoice.SEND_VOICE_ERROR:
      return { ...state, error: action.sendVoice.error };
    case actions.sendVoice.SEND_VOICE_QUERY:
      return { ...state, query: action.sendVoice.query };
    case actions.sendVoice.SEND_VOICE_RESULT:
      return { ...state, result: action.sendVoice.result };
    default:
      return state;
  }
};

export { sendVoice };
