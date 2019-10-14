import { IActionSendAudio } from "../../types/iActionSendAudio";
import { IStateSendAudio } from "../../types/iStateSendAudio";

const initialState: IStateSendAudio = {};

const SEND_AUDIO_ERROR: string = "SEND_AUDIO_ERROR";
const SEND_AUDIO_QUERY: string = "SEND_AUDIO_QUERY";
const SEND_AUDIO_RESULT: string = "SEND_AUDIO_RESULT";

const error: (sendAudio: IStateSendAudio) => IActionSendAudio = (
  sendAudio: IStateSendAudio
): IActionSendAudio => ({
  sendAudio: {
    error: sendAudio.error
  },
  type: SEND_AUDIO_ERROR
});
const query: (sendAudio: IStateSendAudio) => IActionSendAudio = (
  sendAudio: IStateSendAudio
): IActionSendAudio => ({
  sendAudio: {
    query: sendAudio.query
  },
  type: SEND_AUDIO_QUERY
});
const result: (sendAudio: IStateSendAudio) => IActionSendAudio = (
  sendAudio: IStateSendAudio
): IActionSendAudio => ({
  sendAudio: {
    result: sendAudio.result
  },
  type: SEND_AUDIO_RESULT
});

export {
  initialState,
  SEND_AUDIO_ERROR,
  SEND_AUDIO_QUERY,
  SEND_AUDIO_RESULT,
  error,
  query,
  result
};
