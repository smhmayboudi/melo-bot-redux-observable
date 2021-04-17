import * as action from "../actions/commandUI";

import * as reducer from "./commandUI";
import { IStateCommandUI } from "../../types/iStateCommandUI";

describe("commandUI reducer", (): void => {
  test("should handle initialState", (): void => {
    const commandUI: IStateCommandUI = action.initialState;
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: ""
      })
    ).toEqual(commandUI);
  });

  test("should handle help", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "help"
      },
      name: "help"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_HELP
      })
    ).toEqual(commandUI);
  });

  test("should handle setInlineGeo", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "setinlinegeo"
      },
      name: "setInlineGeo"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_SET_INLINE_GEO
      })
    ).toEqual(commandUI);
  });

  test("should handle settings", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "settings"
      },
      name: "settings"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_SETTINGS
      })
    ).toEqual(commandUI);
  });

  test("should handle shortenList", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "sl"
      },
      name: "shortenList"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_SHORTEN_LIST
      })
    ).toEqual(commandUI);
  });

  test("should handle shortenReset", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "sr"
      },
      name: "shortenReset"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_SHORTEN_RESET
      })
    ).toEqual(commandUI);
  });

  test("should handle start", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "start"
      },
      name: "start"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_START
      })
    ).toEqual(commandUI);
  });

  test("should handle startGroup", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "startgroup"
      },
      name: "startGroup"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_START_GROUP
      })
    ).toEqual(commandUI);
  });

  test("should handle youtubeDownload", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "dl"
      },
      name: "download"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_YOUTUBE_DOWNLOAD
      })
    ).toEqual(commandUI);
  });

  test("should handle youtubeSearchListByQ", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "ysl"
      },
      name: "youtubeSearchListByQ"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_Q
      })
    ).toEqual(commandUI);
  });

  test("should handle youtubeSearchListByRelatedToVideoId", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "rl"
      },
      name: "youtubeSearchListByRelatedToVideoId"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_RELATED_TO_VIDEO_ID
      })
    ).toEqual(commandUI);
  });

  test("should handle youtubeVideoList", (): void => {
    const commandUI: IStateCommandUI = {
      command: {
        name: "mp"
      },
      name: "youtubeVideoList"
    };
    expect(
      reducer.commandUI(undefined, {
        commandUI,
        type: action.COMMAND_UI_YOUTUBE_VIDEO_LIST
      })
    ).toEqual(commandUI);
  });
});
