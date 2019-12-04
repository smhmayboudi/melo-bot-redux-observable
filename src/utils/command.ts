import { ICommand } from "../../types/iCommand";
import { ICommandDownloadOptions } from "../../types/iCommandDownloadOptions";
import { ICommandOptions } from "../../types/iCommandOptions";
import { ICommandRelatedToVideoIdOptions } from "../../types/iCommandRelatedToVideoIdOptions";
import { ICommandShortenListOptions } from "../../types/iCommandShortenListOptions";
import { ICommandShortenResetOptions } from "../../types/iCommandShortenResetOptions";
import { decode, encode } from "./string";

const separator = " ";
const starter = "/";
const stringify: (
  name: string,
  opts?: ICommandOptions,
  optsType?: string
) => string = (
  name: string,
  opts?: ICommandOptions,
  optsType?: string
): string =>
  `${starter}${name}${
    opts !== undefined && optsType !== undefined
      ? `${separator}${encode(opts, optsType)}`
      : ""
  }`.trim();
const parse: <TOpts>(cmd: string, optsType?: string) => ICommand<TOpts> = <
  TOpts
>(
  cmd: string,
  optsType?: string
): ICommand<TOpts> => {
  const cmdParts: string[] = cmd.split(separator);
  return {
    name: cmdParts[0],
    options:
      cmdParts[1] !== undefined && optsType !== undefined
        ? decode(cmdParts[1], optsType)
        : undefined
  };
};
const addStickerToSet: () => string = (): string =>
  stringify("addStickerToSet");
const createNewStickerSet: () => string = (): string =>
  stringify("createNewStickerSet");
const download: (opts?: ICommandDownloadOptions) => string = (
  opts?: ICommandDownloadOptions
): string => stringify("dl", opts, "iCommandDownloadOptions");
const getChatMember: () => string = (): string => stringify("getChatMember");
const help: () => string = (): string => stringify("help");
const mostPopular: () => string = (): string => stringify("mp");
const relatedToVideoId: (opts?: ICommandRelatedToVideoIdOptions) => string = (
  opts?: ICommandRelatedToVideoIdOptions
): string => stringify("rl", opts, "iCommandRelatedToVideoIdOptions");
const sendAnimation: () => string = (): string => stringify("sendAnimation");
const sendAudio: () => string = (): string => stringify("sendAudio");
const sendDocument: () => string = (): string => stringify("sendDocument");
const sendMediaGroup: () => string = (): string => stringify("sendMediaGroup");
const sendMessage: () => string = (): string => stringify("sendMessage");
const sendPhoto: () => string = (): string => stringify("sendPhoto");
const sendSticker: () => string = (): string => stringify("sendSticker");
const sendVideo: () => string = (): string => stringify("sendVideo");
const sendVideoNote: () => string = (): string => stringify("sendVideoNote");
const sendVoice: () => string = (): string => stringify("sendVoice");
const setInlineGeo: () => string = (): string => stringify("setinlinegeo");
const settings: () => string = (): string => stringify("settings");
const shortenList: (opts?: ICommandShortenListOptions) => string = (
  opts?: ICommandShortenListOptions
): string => stringify("sl", opts, "iCommandShortenListOptions");
const shortenReset: (opts?: ICommandShortenResetOptions) => string = (
  opts?: ICommandShortenResetOptions
): string => stringify("sr", opts, "iCommandShortenResetOptions");
const start: (opts?: ICommand) => string = (opts?: ICommand): string =>
  stringify("start", opts, "iCommandStartOptions");
const startGroup: (opts?: ICommand) => string = (opts?: ICommand): string =>
  stringify("startGroup", opts, "iCommandStartGroupOptions");
const youtubeDownload: () => string = (): string =>
  stringify("youtubeDownload");
const youtubeSearchList: () => string = (): string =>
  stringify("youtubeSearchList");
const youtubeVideoList: () => string = (): string =>
  stringify("youtubeVideoList");

export {
  addStickerToSet,
  createNewStickerSet,
  download,
  getChatMember,
  help,
  mostPopular,
  parse,
  relatedToVideoId,
  sendAnimation,
  sendAudio,
  sendDocument,
  sendMediaGroup,
  sendMessage,
  sendPhoto,
  sendSticker,
  sendVideo,
  sendVideoNote,
  sendVoice,
  setInlineGeo,
  settings,
  shortenList,
  shortenReset,
  start,
  startGroup,
  stringify,
  youtubeDownload,
  youtubeSearchList,
  youtubeVideoList
};
