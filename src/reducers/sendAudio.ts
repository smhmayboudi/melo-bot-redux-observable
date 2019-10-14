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
      return { error: action.sendAudio.error, query: state.query };
    case actions.sendAudio.SEND_AUDIO_QUERY:
      return { query: action.sendAudio.query };
    case actions.sendAudio.SEND_AUDIO_RESULT:
      return { query: state.query, result: action.sendAudio.result };
    default:
      return state;
  }
};

export { sendAudio };
