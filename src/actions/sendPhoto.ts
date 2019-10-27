import { IActionSendPhoto } from "../../types/iActionSendPhoto";
import { IStateSendPhoto } from "../../types/iStateSendPhoto";

const initialState: IStateSendPhoto = {};

const SEND_PHOTO_ERROR: string = "SEND_PHOTO_ERROR";
const SEND_PHOTO_QUERY: string = "SEND_PHOTO_QUERY";
const SEND_PHOTO_RESULT: string = "SEND_PHOTO_RESULT";

const error: (sendPhoto: IStateSendPhoto) => IActionSendPhoto = (
  sendPhoto: IStateSendPhoto
): IActionSendPhoto => ({
  sendPhoto: {
    error: sendPhoto.error
  },
  type: SEND_PHOTO_ERROR
});
const query: (sendPhoto: IStateSendPhoto) => IActionSendPhoto = (
  sendPhoto: IStateSendPhoto
): IActionSendPhoto => ({
  sendPhoto: {
    query: sendPhoto.query
  },
  type: SEND_PHOTO_QUERY
});
const result: (sendPhoto: IStateSendPhoto) => IActionSendPhoto = (
  sendPhoto: IStateSendPhoto
): IActionSendPhoto => ({
  sendPhoto: {
    result: sendPhoto.result
  },
  type: SEND_PHOTO_RESULT
});

export {
  initialState,
  SEND_PHOTO_ERROR,
  SEND_PHOTO_QUERY,
  SEND_PHOTO_RESULT,
  error,
  query,
  result
};
