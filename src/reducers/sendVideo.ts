import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IStateSendVideo } from "../../types/iStateSendVideo";
import * as actions from "../actions";

const sendVideo:
  (
    state: IStateSendVideo | undefined,
    action: IActionSendVideo,
  ) =>
    IStateSendVideo =
  (
    state: IStateSendVideo | undefined = actions.sendVideo.initalState,
    action: IActionSendVideo,
  ):
    IStateSendVideo => {
    switch (action.type) {
      case actions.sendVideo.SEND_VIDEO_ERROR:
        return { error: action.sendVideo.error, query: state.query };
      case actions.sendVideo.SEND_VIDEO_QUERY:
        return { query: action.sendVideo.query };
      case actions.sendVideo.SEND_VIDEO_RESULT:
        return { query: state.query, result: action.sendVideo.result };
      default:
        return state;
    }
  };

export { sendVideo };
