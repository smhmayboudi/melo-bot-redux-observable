import { IActionCommandUI } from "../../types/iActionCommandUI";
import { ICommandShortenListOptions } from "../../types/iCommandShortenListOptions";
import { ICommandShortenResetOptions } from "../../types/iCommandShortenResetOptions";
import { ICommandStartGroupOptions } from "../../types/iCommandStartGroupOptions";
import { ICommandStartOptions } from "../../types/iCommandStartOptions";
import { ICommandYoutubeDownloadOptions } from "../../types/iCommandYoutubeDownloadOptions";
import { ICommandYoutubeSearchListByQOptions } from "../../types/iCommandYoutubeSearchListByQOptions";
import { ICommandYoutubeSearchListByRelatedToVideoIdOptions } from "../../types/iCommandYoutubeSearchListByRelatedToVideoIdOptions";
import { IStateCommandUI } from "../../types/iStateCommandUI";

const initialState: IStateCommandUI = {};

const COMMAND_UI_HELP = "COMMAND_UI_HELP";
const COMMAND_UI_SET_INLINE_GEO = "COMMAND_UI_SET_INLINE_GEO";
const COMMAND_UI_SETTINGS = "COMMAND_UI_SETTINGS";
const COMMAND_UI_SHORTEN_LIST = "COMMAND_UI_SHORTEN_LIST";
const COMMAND_UI_SHORTEN_RESET = "COMMAND_UI_SHORTEN_RESET";
const COMMAND_UI_START = "COMMAND_UI_START";
const COMMAND_UI_START_GROUP = "COMMAND_UI_START_GROUP";
const COMMAND_UI_YOUTUBE_DOWNLOAD = "COMMAND_UI_YOUTUBE_DOWNLOAD";
const COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_Q =
  "COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_Q";
const COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_RELATED_TO_VIDEO_ID =
  "COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_RELATED_TO_VIDEO_ID";
const COMMAND_UI_YOUTUBE_VIDEO_LIST = "COMMAND_UI_YOUTUBE_VIDEO_LIST";

const help: () => IActionCommandUI = (): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "help"
    },
    name: "help"
  },
  type: COMMAND_UI_HELP
});
const setInlineGeo: () => IActionCommandUI = (): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "setinlinegeo"
    },
    name: "setInlineGeo"
  },
  type: COMMAND_UI_SET_INLINE_GEO
});
const settings: () => IActionCommandUI = (): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "settings"
    },
    name: "settings"
  },
  type: COMMAND_UI_SETTINGS
});
const shortenList: (
  options?: ICommandShortenListOptions
) => IActionCommandUI = (
  options?: ICommandShortenListOptions
): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "sl",
      options
    },
    name: "shortenList"
  },
  type: COMMAND_UI_SHORTEN_LIST
});
const shortenReset: (
  options?: ICommandShortenResetOptions
) => IActionCommandUI = (
  options?: ICommandShortenResetOptions
): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "sr",
      options
    },
    name: "shortenReset"
  },
  type: COMMAND_UI_SHORTEN_RESET
});
const start: (options?: ICommandStartOptions) => IActionCommandUI = (
  options?: ICommandStartOptions
): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "start",
      options
    },
    name: "start"
  },
  type: COMMAND_UI_START
});
const startGroup: (options?: ICommandStartGroupOptions) => IActionCommandUI = (
  options?: ICommandStartGroupOptions
): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "startgroup",
      options
    },
    name: "startGroup"
  },
  type: COMMAND_UI_START_GROUP
});
const youtubeDownload: (
  options?: ICommandYoutubeDownloadOptions
) => IActionCommandUI = (
  options?: ICommandYoutubeDownloadOptions
): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "dl",
      options
    },
    name: "download"
  },
  type: COMMAND_UI_YOUTUBE_DOWNLOAD
});
const youtubeSearchListByQ: (
  options?: ICommandYoutubeSearchListByQOptions
) => IActionCommandUI = (
  options?: ICommandYoutubeSearchListByQOptions
): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "ysl",
      options
    },
    name: "youtubeSearchListByQ"
  },
  type: COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_Q
});

const youtubeSearchListByRelatedToVideoId: (
  options?: ICommandYoutubeSearchListByRelatedToVideoIdOptions
) => IActionCommandUI = (
  options?: ICommandYoutubeSearchListByRelatedToVideoIdOptions
): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "rl",
      options
    },
    name: "youtubeSearchListByRelatedToVideoId"
  },
  type: COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_RELATED_TO_VIDEO_ID
});
const youtubeVideoList: () => IActionCommandUI = (): IActionCommandUI => ({
  commandUI: {
    command: {
      name: "mp"
    },
    name: "youtubeVideoList"
  },
  type: COMMAND_UI_YOUTUBE_VIDEO_LIST
});

export {
  initialState,
  COMMAND_UI_HELP,
  COMMAND_UI_SET_INLINE_GEO,
  COMMAND_UI_SETTINGS,
  COMMAND_UI_SHORTEN_LIST,
  COMMAND_UI_SHORTEN_RESET,
  COMMAND_UI_START,
  COMMAND_UI_START_GROUP,
  COMMAND_UI_YOUTUBE_DOWNLOAD,
  COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_Q,
  COMMAND_UI_YOUTUBE_SEARCH_LIST_BY_RELATED_TO_VIDEO_ID,
  COMMAND_UI_YOUTUBE_VIDEO_LIST,
  help,
  setInlineGeo,
  settings,
  shortenList,
  shortenReset,
  start,
  startGroup,
  youtubeDownload,
  youtubeSearchListByQ,
  youtubeSearchListByRelatedToVideoId,
  youtubeVideoList
};
