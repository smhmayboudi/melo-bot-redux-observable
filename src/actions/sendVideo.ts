import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IStateSendVideo } from "../../types/iStateSendVideo";

const initialState: IStateSendVideo = {};

const SEND_VIDEO_ERROR = "SEND_VIDEO_ERROR";
const SEND_VIDEO_QUERY = "SEND_VIDEO_QUERY";
const SEND_VIDEO_RESULT = "SEND_VIDEO_RESULT";

const error: (sendVideo: IStateSendVideo) => IActionSendVideo = (
  sendVideo: IStateSendVideo
): IActionSendVideo => ({
  sendVideo: { error: sendVideo.error },
  type: SEND_VIDEO_ERROR
});
const query: (sendVideo: IStateSendVideo) => IActionSendVideo = (
  sendVideo: IStateSendVideo
): IActionSendVideo => ({
  sendVideo: { query: sendVideo.query },
  type: SEND_VIDEO_QUERY
});
const result: (sendVideo: IStateSendVideo) => IActionSendVideo = (
  sendVideo: IStateSendVideo
): IActionSendVideo => ({
  sendVideo: { result: sendVideo.result },
  type: SEND_VIDEO_RESULT
});

export {
  initialState,
  SEND_VIDEO_ERROR,
  SEND_VIDEO_QUERY,
  SEND_VIDEO_RESULT,
  error,
  query,
  result
};
