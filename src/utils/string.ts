import * as base64 from "@protobufjs/base64";
import { youtube_v3 } from "googleapis";
import * as path from "path";
import * as protobufjs from "protobufjs";

import { IStateShortenListResult } from "../../types/iStateShortenListResult";
import { findByCode } from "../configs/emojis";
import * as env from "../configs/env";
import * as texts from "../configs/texts";
import * as command from "../utils/command";
import * as commandStart from "../utils/commandStart";

const caption: (text: string) => string = (text: string): string =>
  `${text.substring(0, env.TELEGRAM_CAPTION_LENGTH)}\n\n${
    findByCode("1F194").char
  } <a href="${env.CHANNEL_JOIN_LINK}">@${env.CHANNEL}</a>`;

const decode = (text: string, objType: string): any => {
  const root = protobufjs.loadSync(`./proto/${objType}.proto`);
  const type = root.lookupType(objType);
  const buffer = Buffer.from(text, "base64");
  const message = type.decode(buffer);
  return message;
};

const encode = (obj: any, objType: string): string => {
  const root = protobufjs.loadSync(`./proto/${objType}.proto`);
  const type = root.lookupType(objType);
  const errMsg = type.verify(obj);
  if (errMsg) {
    throw Error(errMsg);
  }
  const message = type.create(obj);
  const buffer = type.encode(message).finish();
  const text = base64.encode(buffer, 0, buffer.length).replace(/=/g, "");
  return text;
};

const pathThumb: (id: string) => string = (id: string): string =>
  path.resolve(__dirname, "../../asset", `${id}.jpg`);

const pathVideo: (id: string) => string = (id: string): string =>
  path.resolve(__dirname, "../../asset", `${id}.mp4`);

const text: (text: string) => string = (text: string): string =>
  `${text.substring(0, env.TELEGRAM_TEXT_LENGTH)}\n\n${
    findByCode("1F194").char
  } <a href="${env.CHANNEL_JOIN_LINK}">@${env.CHANNEL}</a>`;

const transformSearchResultCaption: (
  item: youtube_v3.Schema$SearchResult
) => string = (item: youtube_v3.Schema$SearchResult): string => {
  const res: string[] = [];
  if (
    item.id !== undefined &&
    item.id.videoId !== null &&
    item.id.videoId !== undefined &&
    item.snippet !== undefined &&
    item.snippet.title !== null &&
    item.snippet.title !== undefined &&
    item.snippet.description !== null &&
    item.snippet.description !== undefined
  ) {
    res.push(item.snippet.title);
    res.push(item.snippet.description);
    res.push("");
    res.push(
      `${findByCode("1F4E5").char} ${command.download({ id: item.id.videoId })}`
    );
    res.push(
      `${findByCode("1F517").char} ${command.relatedToVideoId({
        id: item.id.videoId
      })}`
    );
  }

  return text(res.join("\n"));
};

const transformSearchResults: (
  items: youtube_v3.Schema$SearchResult[],
  q?: string,
  relatedToVideoId?: string
) => string = (
  items: youtube_v3.Schema$SearchResult[],
  q?: string,
  relatedToVideoId?: string
): string => {
  const res: string[] = [];
  if (items.length === 0) {
    return texts.messageNoResult;
  }
  for (let index: number = items.length; index > 0; index = index - 1) {
    const value: youtube_v3.Schema$SearchResult = items[index - 1];
    const msg: string[] = [];
    if (
      value.id !== undefined &&
      value.id.videoId !== null &&
      value.id.videoId !== undefined &&
      value.snippet !== undefined &&
      value.snippet.title !== null &&
      value.snippet.title !== undefined
    ) {
      msg.push(`${index}. ${value.snippet.title}`);
      msg.push(
        `${findByCode("1F4E5").char} ${command.download({
          id: value.id.videoId
        })}`
      );
      msg.push(
        `${findByCode("1F517").char} ${command.relatedToVideoId({
          id: value.id.videoId
        })}`
      );
      msg.push(
        `${findByCode("1F517").char} ${commandStart.start({
          cmd: command.relatedToVideoId({ id: value.id.videoId })
        })}`
      );
    }
    msg.push(texts.messageSeparator);
    res.push(msg.join("\n"));
  }
  if (q !== undefined) {
    res.push(texts.messageResultQ(q));
  } else if (relatedToVideoId !== undefined) {
    res.push(texts.messageResultRelatedToVideoId(relatedToVideoId));
  }

  return text(res.join("\n"));
};

const transformSearchResultUrl: (
  item: youtube_v3.Schema$SearchResult
) => string = (item: youtube_v3.Schema$SearchResult): string => {
  if (item.snippet !== undefined && item.snippet.thumbnails !== undefined) {
    if (
      item.snippet.thumbnails.maxres !== undefined &&
      item.snippet.thumbnails.maxres.url !== null &&
      item.snippet.thumbnails.maxres.url !== undefined
    ) {
      return item.snippet.thumbnails.maxres.url;
    } else if (
      item.snippet.thumbnails.standard !== undefined &&
      item.snippet.thumbnails.standard.url !== null &&
      item.snippet.thumbnails.standard.url !== undefined
    ) {
      return item.snippet.thumbnails.standard.url;
    } else if (
      item.snippet.thumbnails.high !== undefined &&
      item.snippet.thumbnails.high.url !== null &&
      item.snippet.thumbnails.high.url !== undefined
    ) {
      return item.snippet.thumbnails.high.url;
    } else if (
      item.snippet.thumbnails.medium !== undefined &&
      item.snippet.thumbnails.medium.url !== null &&
      item.snippet.thumbnails.medium.url !== undefined
    ) {
      return item.snippet.thumbnails.medium.url;
    } else if (
      item.snippet.thumbnails.default !== undefined &&
      item.snippet.thumbnails.default.url !== null &&
      item.snippet.thumbnails.default.url !== undefined
    ) {
      return item.snippet.thumbnails.default.url;
    }
  }
  return "";
};

const transformShortenList: (rows?: IStateShortenListResult[]) => string = (
  rows?: IStateShortenListResult[]
): string => {
  if (rows === undefined || rows.length === 0) {
    return texts.messageNoResult;
  }
  const res: string[] = [];
  for (let index: number = rows.length; index > 0; index = index - 1) {
    const row: IStateShortenListResult = rows[index - 1];
    const msg: string[] = [];
    msg.push(`<b>id</b>: ${row.id}`);
    msg.push(`<b>shortLink</b>: ${row.shortLink}`);
    msg.push(`<b>longLink</b>: ${row.longLink}`);
    msg.push(`<b>longBase64</b>: ${row.longBase64}`);
    msg.push(`<b>alphabet</b>: ${row.alphabet}`);
    msg.push(`<b>count</b>: ${row.count}`);
    msg.push(`<b>date</b>: ${row.date}`);
    msg.push(command.shortenReset({ id: row.id }));
    msg.push(texts.messageSeparator);
    res.push(msg.join("\n"));
  }
  return res.join("\n");
};

const transformVideoCaption: (item: youtube_v3.Schema$Video) => string = (
  item: youtube_v3.Schema$Video
): string => {
  const res: string[] = [];
  if (
    item.id !== undefined &&
    item.id !== null &&
    item.snippet !== undefined &&
    item.snippet.title !== null &&
    item.snippet.title !== undefined &&
    item.snippet.description !== null &&
    item.snippet.description !== undefined
  ) {
    res.push(item.snippet.title);
    res.push(item.snippet.description);
    res.push("");
    res.push(
      `${findByCode("1F4E5").char} ${command.download({ id: item.id })}`
    );
    res.push(
      `${findByCode("1F517").char} ${command.relatedToVideoId({ id: item.id })}`
    );
  }

  return caption(res.join("\n"));
};

const transformVideos: (
  items: youtube_v3.Schema$Video[],
  chart: string
) => string = (items: youtube_v3.Schema$Video[], chart: string): string => {
  if (items.length === 0) {
    return texts.messageNoResult;
  }
  const res: string[] = [];
  for (let index: number = items.length; index > 0; index = index - 1) {
    const value: youtube_v3.Schema$Video = items[index - 1];
    const msg: string[] = [];
    if (
      value.id !== undefined &&
      value.id !== null &&
      value.snippet !== undefined &&
      value.snippet.title !== null &&
      value.snippet.title !== undefined
    ) {
      msg.push(`${index}. ${value.snippet.title}`);
      msg.push(
        `${findByCode("1F4E5").char} ${command.download({ id: value.id })}`
      );
      msg.push(
        `${findByCode("1F517").char} ${command.relatedToVideoId({
          id: value.id
        })}`
      );
    }
    msg.push(texts.messageSeparator);
    res.push(msg.join("\n"));
  }
  res.push(texts.messageResultChart(chart));

  return text(res.join("\n"));
};

const transformVideoThumbnailUrl: (item: youtube_v3.Schema$Video) => string = (
  item: youtube_v3.Schema$Video
): string => {
  if (item.snippet !== undefined && item.snippet.thumbnails !== undefined) {
    if (
      item.snippet.thumbnails.maxres !== undefined &&
      item.snippet.thumbnails.maxres.url !== null &&
      item.snippet.thumbnails.maxres.url !== undefined
    ) {
      return item.snippet.thumbnails.maxres.url;
    } else if (
      item.snippet.thumbnails.standard !== undefined &&
      item.snippet.thumbnails.standard.url !== null &&
      item.snippet.thumbnails.standard.url !== undefined
    ) {
      return item.snippet.thumbnails.standard.url;
    } else if (
      item.snippet.thumbnails.high !== undefined &&
      item.snippet.thumbnails.high.url !== null &&
      item.snippet.thumbnails.high.url !== undefined
    ) {
      return item.snippet.thumbnails.high.url;
    } else if (
      item.snippet.thumbnails.medium !== undefined &&
      item.snippet.thumbnails.medium.url !== null &&
      item.snippet.thumbnails.medium.url !== undefined
    ) {
      return item.snippet.thumbnails.medium.url;
    } else if (
      item.snippet.thumbnails.default !== undefined &&
      item.snippet.thumbnails.default.url !== null &&
      item.snippet.thumbnails.default.url !== undefined
    ) {
      return item.snippet.thumbnails.default.url;
    }
  }
  return "";
};

export {
  caption,
  decode,
  encode,
  pathThumb,
  pathVideo,
  text,
  transformSearchResultCaption,
  transformSearchResults,
  transformSearchResultUrl,
  transformShortenList,
  transformVideoCaption,
  transformVideos,
  transformVideoThumbnailUrl
};
