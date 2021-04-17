import { IActionCommandUI } from "../../types/iActionCommandUI";
import { IStateCommandUI } from "../../types/iStateCommandUI";
import * as actions from "../actions";

const commandUI: (
  state: IStateCommandUI | undefined,
  action: IActionCommandUI
) => IStateCommandUI = (
  state: IStateCommandUI | undefined = actions.commandUI.initialState,
  action: IActionCommandUI
): IStateCommandUI => {
  switch (action.type) {
    case actions.commandUI.COMMAND_UI_HELP:
    case actions.commandUI.COMMAND_UI_SET_INLINE_GEO:
    case actions.commandUI.COMMAND_UI_SETTINGS:
    case actions.commandUI.COMMAND_UI_SHORTEN_LIST:
    case actions.commandUI.COMMAND_UI_SHORTEN_RESET:
    case actions.commandUI.COMMAND_UI_START:
    case actions.commandUI.COMMAND_UI_START_GROUP:
    case actions.commandUI.COMMAND_UI_YOUTUBE_DOWNLOAD:
    case actions.commandUI.COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_Q:
    case actions.commandUI
      .COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_RELATED_TO_VIDEO_ID:
    case actions.commandUI.COMMAND_UI_YOUTUBE_VIDEO_LIST:
      return action.commandUI;
    default:
      return state;
  }
};

export { commandUI };
