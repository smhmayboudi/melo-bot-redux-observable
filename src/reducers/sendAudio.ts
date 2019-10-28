import { IActionSendAudio } from "../../types/iActionSendAudio";
import { IStateSendAudio } from "../../types/iStateSendAudio";
import * as actions from "../actions";

const sendAudio: (
  state: IStateSendAudio | undefined,
  action: IActionSendAudio
) => IStateSendAudio = (
  state: IStateSendAudio | undefined = actions.sendAudio.initialState,
  action: IActionSendAudio
): IStateSendAudio => {
  switch (action.type) {
    case actions.sendAudio.SEND_AUDIO_ERROR:
      return { ...state, error: action.sendAudio.error };
    case actions.sendAudio.SEND_AUDIO_QUERY:
      return { ...state, query: action.sendAudio.query };
    case actions.sendAudio.SEND_AUDIO_RESULT:
      return { ...state, result: action.sendAudio.result };
    default:
      return state;
  }
};

export { sendAudio };
