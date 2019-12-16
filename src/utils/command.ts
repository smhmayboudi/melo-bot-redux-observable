import { ICommand } from "../../types/iCommand";
import { ICommandOptions } from "../../types/iCommandOptions";
import { ICommandShortenListOptions } from "../../types/iCommandShortenListOptions";
import { ICommandShortenResetOptions } from "../../types/iCommandShortenResetOptions";
import { ICommandStartGroupOptions } from "../../types/iCommandStartGroupOptions";
import { ICommandStartOptions } from "../../types/iCommandStartOptions";
import { ICommandYoutubeDownloadOptions } from "../../types/iCommandYoutubeDownloadOptions";
import { ICommandYoutubeSearchListByQOptions } from "../../types/iCommandYoutubeSearchListByQOptions";
import { ICommandYoutubeSearchListByRelatedToVideoIdOptions } from "../../types/iCommandYoutubeSearchListByRelatedToVideoIdOptions";
import { decode, encode } from "./string";

const separator = " ";
const starter = "/";
const stringify: (
  name: string,
  options?: ICommandOptions,
  optionsType?: string
) => string = (
  name: string,
  options?: ICommandOptions,
  optionsType?: string
): string =>
  `${starter}${name}${
    options !== undefined && optionsType !== undefined
      ? `${separator}${encode(options, optionsType)}`
      : ""
  }`.trim();
const split: (cmd: string) => string[] = (cmd: string): string[] =>
  cmd.split(separator);
const parse: <TOpts>(cmd: string, optionsType?: string) => ICommand<TOpts> = <
  TOpts
>(
  cmd: string,
  optionsType?: string
): ICommand<TOpts> => {
  const cmdParts: string[] = split(cmd);
  return {
    name: cmdParts[0],
    options:
      cmdParts[1] !== undefined && optionsType !== undefined
        ? decode(cmdParts[1], optionsType)
        : undefined
  };
};
const help: () => string = (): string => stringify("help");
const setInlineGeo: () => string = (): string => stringify("setinlinegeo");
const settings: () => string = (): string => stringify("settings");
const shortenList: (options?: ICommandShortenListOptions) => string = (
  options?: ICommandShortenListOptions
): string => stringify("sl", options, "iCommandShortenListOptions");
const shortenReset: (options?: ICommandShortenResetOptions) => string = (
  options?: ICommandShortenResetOptions
): string => stringify("sr", options, "iCommandShortenResetOptions");
const start: (options?: ICommandStartOptions) => string = (
  options?: ICommandStartOptions
): string => stringify("start", options, "iCommandStartOptions");
const startGroup: (options?: ICommandStartGroupOptions) => string = (
  options?: ICommandStartGroupOptions
): string => stringify("startgroup", options, "iCommandStartGroupOptions");
const youtubeDownload: (options?: ICommandYoutubeDownloadOptions) => string = (
  options?: ICommandYoutubeDownloadOptions
): string => stringify("dl", options, "iCommandYoutubeDownloadOptions");
const youtubeSearchListByQ: (
  options?: ICommandYoutubeSearchListByQOptions
) => string = (options?: ICommandYoutubeSearchListByQOptions): string =>
  stringify("ysl", options, "iCommandYoutubeSearchListByQOptions");
const youtubeSearchListByRelatedToVideoId: (
  options?: ICommandYoutubeSearchListByRelatedToVideoIdOptions
) => string = (
  options?: ICommandYoutubeSearchListByRelatedToVideoIdOptions
): string =>
  stringify(
    "rl",
    options,
    "iCommandYoutubeSearchListByRelatedToVideoIdOptions"
  );
const youtubeVideoList: () => string = (): string => stringify("mp");

export {
  help,
  parse,
  setInlineGeo,
  settings,
  shortenList,
  shortenReset,
  split,
  start,
  startGroup,
  stringify,
  youtubeDownload,
  youtubeSearchListByQ,
  youtubeSearchListByRelatedToVideoId,
  youtubeVideoList
};
