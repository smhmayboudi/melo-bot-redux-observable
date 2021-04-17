import * as action from "./commandUI";

describe("commandUI actions", (): void => {
  test("should handle help", (): void => {
    expect(action.help()).toEqual({
      commandUI: {
        command: {
          name: "help"
        },
        name: "help"
      },
      type: action.COMMAND_UI_HELP
    });
  });

  test("should handle setInlineGeo", (): void => {
    expect(action.setInlineGeo()).toEqual({
      commandUI: {
        command: {
          name: "setinlinegeo"
        },
        name: "setInlineGeo"
      },
      type: action.COMMAND_UI_SET_INLINE_GEO
    });
  });

  test("should handle settings", (): void => {
    expect(action.settings()).toEqual({
      commandUI: {
        command: {
          name: "settings"
        },
        name: "settings"
      },
      type: action.COMMAND_UI_SETTINGS
    });
  });

  test("should handle shortenList", (): void => {
    expect(action.shortenList()).toEqual({
      commandUI: {
        command: {
          name: "sl"
        },
        name: "shortenList"
      },
      type: action.COMMAND_UI_SHORTEN_LIST
    });
  });

  test("should handle shortenReset", (): void => {
    expect(action.shortenReset()).toEqual({
      commandUI: {
        command: {
          name: "sr"
        },
        name: "shortenReset"
      },
      type: action.COMMAND_UI_SHORTEN_RESET
    });
  });

  test("should handle start", (): void => {
    expect(action.start()).toEqual({
      commandUI: {
        command: {
          name: "start"
        },
        name: "start"
      },
      type: action.COMMAND_UI_START
    });
  });

  test("should handle startGroup", (): void => {
    expect(action.startGroup()).toEqual({
      commandUI: {
        command: {
          name: "startgroup"
        },
        name: "startGroup"
      },
      type: action.COMMAND_UI_START_GROUP
    });
  });

  test("should handle youtubeDownload", (): void => {
    expect(action.youtubeDownload()).toEqual({
      commandUI: {
        command: {
          name: "dl"
        },
        name: "download"
      },
      type: action.COMMAND_UI_YOUTUBE_DOWNLOAD
    });
  });

  test("should handle youtubeSearchListByQ", (): void => {
    expect(action.youtubeSearchListByQ()).toEqual({
      commandUI: {
        command: {
          name: "ysl"
        },
        name: "youtubeSearchListByQ"
      },
      type: action.COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_Q
    });
  });

  test("should handle youtubeSearchListByRelatedToVideoId", (): void => {
    expect(action.youtubeSearchListByRelatedToVideoId()).toEqual({
      commandUI: {
        command: {
          name: "rl"
        },
        name: "youtubeSearchListByRelatedToVideoId"
      },
      type: action.COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_RELATED_TO_VIDEO_ID
    });
  });

  test("should handle youtubeVideoList", (): void => {
    expect(action.youtubeVideoList()).toEqual({
      commandUI: {
        command: {
          name: "mp"
        },
        name: "youtubeVideoList"
      },
      type: action.COMMAND_UI_YOUTUBE_VIDEO_LIST
    });
  });
});
