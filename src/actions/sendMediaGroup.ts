import { IActionSendMediaGroup } from "../../types/iActionSendMediaGroup";
import { IStateSendMediaGroup } from "../../types/iStateSendMediaGroup";

const initialState: IStateSendMediaGroup = {};

const SEND_MEDIA_GROUP_ERROR = "SEND_MEDIA_GROUP_ERROR";
const SEND_MEDIA_GROUP_QUERY = "SEND_MEDIA_GROUP_QUERY";
const SEND_MEDIA_GROUP_RESULT = "SEND_MEDIA_GROUP_RESULT";

const error: (sendMediaGroup: IStateSendMediaGroup) => IActionSendMediaGroup = (
  sendMediaGroup: IStateSendMediaGroup
): IActionSendMediaGroup => ({
  sendMediaGroup: { error: sendMediaGroup.error },
  type: SEND_MEDIA_GROUP_ERROR
});
const query: (sendMediaGroup: IStateSendMediaGroup) => IActionSendMediaGroup = (
  sendMediaGroup: IStateSendMediaGroup
): IActionSendMediaGroup => ({
  sendMediaGroup: { query: sendMediaGroup.query },
  type: SEND_MEDIA_GROUP_QUERY
});
const result: (
  sendMediaGroup: IStateSendMediaGroup
) => IActionSendMediaGroup = (
  sendMediaGroup: IStateSendMediaGroup
): IActionSendMediaGroup => ({
  sendMediaGroup: { result: sendMediaGroup.result },
  type: SEND_MEDIA_GROUP_RESULT
});

export {
  initialState,
  SEND_MEDIA_GROUP_ERROR,
  SEND_MEDIA_GROUP_QUERY,
  SEND_MEDIA_GROUP_RESULT,
  error,
  query,
  result
};
