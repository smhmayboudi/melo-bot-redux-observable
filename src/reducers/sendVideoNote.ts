import { IActionSendVideoNote } from "../../types/iActionSendVideoNote";
import { IStateSendVideoNote } from "../../types/iStateSendVideoNote";
import * as actions from "../actions";

const sendVideoNote: (
  state: IStateSendVideoNote | undefined,
  action: IActionSendVideoNote
) => IStateSendVideoNote = (
  state: IStateSendVideoNote | undefined = actions.sendVideoNote.initialState,
  action: IActionSendVideoNote
): IStateSendVideoNote => {
  switch (action.type) {
    case actions.sendVideoNote.SEND_VIDEO_NOTE_ERROR:
      return { error: action.sendVideoNote.error, query: state.query };
    case actions.sendVideoNote.SEND_VIDEO_NOTE_QUERY:
      return { query: action.sendVideoNote.query };
    case actions.sendVideoNote.SEND_VIDEO_NOTE_RESULT:
      return { query: state.query, result: action.sendVideoNote.result };
    default:
      return state;
  }
};

export { sendVideoNote };
