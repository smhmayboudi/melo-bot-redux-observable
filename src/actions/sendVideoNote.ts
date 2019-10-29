import { IActionSendVideoNote } from "../../types/iActionSendVideoNote";
import { IStateSendVideoNote } from "../../types/iStateSendVideoNote";

const initialState: IStateSendVideoNote = {};

const SEND_VIDEO_NOTE_ERROR = "SEND_VIDEO_NOTE_ERROR";
const SEND_VIDEO_NOTE_QUERY = "SEND_VIDEO_NOTE_QUERY";
const SEND_VIDEO_NOTE_RESULT = "SEND_VIDEO_NOTE_RESULT";

const error: (sendVideoNote: IStateSendVideoNote) => IActionSendVideoNote = (
  sendVideoNote: IStateSendVideoNote
): IActionSendVideoNote => ({
  sendVideoNote: {
    error: sendVideoNote.error
  },
  type: SEND_VIDEO_NOTE_ERROR
});
const query: (sendVideoNote: IStateSendVideoNote) => IActionSendVideoNote = (
  sendVideoNote: IStateSendVideoNote
): IActionSendVideoNote => ({
  sendVideoNote: {
    query: sendVideoNote.query
  },
  type: SEND_VIDEO_NOTE_QUERY
});
const result: (sendVideoNote: IStateSendVideoNote) => IActionSendVideoNote = (
  sendVideoNote: IStateSendVideoNote
): IActionSendVideoNote => ({
  sendVideoNote: {
    result: sendVideoNote.result
  },
  type: SEND_VIDEO_NOTE_RESULT
});

export {
  initialState,
  SEND_VIDEO_NOTE_ERROR,
  SEND_VIDEO_NOTE_QUERY,
  SEND_VIDEO_NOTE_RESULT,
  error,
  query,
  result
};
