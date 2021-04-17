import { IActionSendVoice } from "../../types/iActionSendVoice";
import { IStateSendVoice } from "../../types/iStateSendVoice";

const initialState: IStateSendVoice = {};

const SEND_VOICE_ERROR = "SEND_VOICE_ERROR";
const SEND_VOICE_QUERY = "SEND_VOICE_QUERY";
const SEND_VOICE_RESULT = "SEND_VOICE_RESULT";

const error: (sendVoice: IStateSendVoice) => IActionSendVoice = (
  sendVoice: IStateSendVoice
): IActionSendVoice => ({
  sendVoice: { error: sendVoice.error },
  type: SEND_VOICE_ERROR
});
const query: (sendVoice: IStateSendVoice) => IActionSendVoice = (
  sendVoice: IStateSendVoice
): IActionSendVoice => ({
  sendVoice: { query: sendVoice.query },
  type: SEND_VOICE_QUERY
});
const result: (sendVoice: IStateSendVoice) => IActionSendVoice = (
  sendVoice: IStateSendVoice
): IActionSendVoice => ({
  sendVoice: { result: sendVoice.result },
  type: SEND_VOICE_RESULT
});

export {
  initialState,
  SEND_VOICE_ERROR,
  SEND_VOICE_QUERY,
  SEND_VOICE_RESULT,
  error,
  query,
  result
};
