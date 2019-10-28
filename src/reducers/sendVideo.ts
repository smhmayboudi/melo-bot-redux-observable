import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IStateSendVideo } from "../../types/iStateSendVideo";
import * as actions from "../actions";

const sendVideo: (
  state: IStateSendVideo | undefined,
  action: IActionSendVideo
) => IStateSendVideo = (
  state: IStateSendVideo | undefined = actions.sendVideo.initialState,
  action: IActionSendVideo
): IStateSendVideo => {
  switch (action.type) {
    case actions.sendVideo.SEND_VIDEO_ERROR:
      return { ...state, error: action.sendVideo.error };
    case actions.sendVideo.SEND_VIDEO_QUERY:
      return { ...state, query: action.sendVideo.query };
    case actions.sendVideo.SEND_VIDEO_RESULT:
      return { ...state, result: action.sendVideo.result };
    default:
      return state;
  }
};

export { sendVideo };
