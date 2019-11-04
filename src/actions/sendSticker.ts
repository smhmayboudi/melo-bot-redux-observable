import { IActionSendSticker } from "../../types/iActionSendSticker";
import { IStateSendSticker } from "../../types/iStateSendSticker";

const initialState: IStateSendSticker = {};

const SEND_STICKER_ERROR = "SEND_STICKER_ERROR";
const SEND_STICKER_QUERY = "SEND_STICKER_QUERY";
const SEND_STICKER_RESULT = "SEND_STICKER_RESULT";

const error: (sendSticker: IStateSendSticker) => IActionSendSticker = (
  sendSticker: IStateSendSticker
): IActionSendSticker => ({
  sendSticker: { error: sendSticker.error },
  type: SEND_STICKER_ERROR
});
const query: (sendSticker: IStateSendSticker) => IActionSendSticker = (
  sendSticker: IStateSendSticker
): IActionSendSticker => ({
  sendSticker: { query: sendSticker.query },
  type: SEND_STICKER_QUERY
});
const result: (sendSticker: IStateSendSticker) => IActionSendSticker = (
  sendSticker: IStateSendSticker
): IActionSendSticker => ({
  sendSticker: { result: sendSticker.result },
  type: SEND_STICKER_RESULT
});

export {
  initialState,
  SEND_STICKER_ERROR,
  SEND_STICKER_QUERY,
  SEND_STICKER_RESULT,
  error,
  query,
  result
};
