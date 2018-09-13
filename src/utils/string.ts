import { youtube_v3 } from "googleapis";
import * as path from "path";
import * as icons from "../config/icons";
import * as texts from "../config/texts";

const caption:
  (title?: string) => string =
  (title?: string): string =>
    `${title || ""}\n\n🆔 @melodio`.trim();

const decode:
  (id: string) => string =
  (id: string): string =>
    Buffer
      .from(id, "base64")
      .toString("ascii")
  ;

const encode:
  (id: string) => string =
  (id: string): string =>
    Buffer.from(id)
      .toString("base64")
      .replace(/=/g, "")
  ;

const pathThumb:
  (id: string) => string =
  (id: string): string =>
    path.resolve(__dirname, "../../asset", `${encode(id)}.jpg`)
  ;

const pathVideo:
  (id: string) => string =
  (id: string): string =>
    path.resolve(__dirname, "../../asset", `${encode(id)}.mp4`)
  ;

const transformSearchList:
  (items: youtube_v3.Schema$SearchResult[], q: string) => string =
  // @ts-ignore
  (items: youtube_v3.Schema$SearchResult[], q: string): string => {
    if (items.length === 0) {
      return texts.messageNoResult;
    }
    const res: string[] = [];
    for (let index: number = items.length; index > 0; index--) {
      const value: youtube_v3.Schema$SearchResult = items[index - 1];
      const msg: string[] = [];
      if (value.snippet !== undefined && value.snippet.title !== undefined) {
        msg.push(`${index}. ${value.snippet.title}`);
      }
      if (value.id !== undefined && value.id.videoId !== undefined) {
        const videoId: string = encode(value.id.videoId);
        msg.push(`${icons.inboxTray} /${texts.commandDownload}${texts.commandSeparator}${videoId}`);
      }
      msg.push(texts.messageSeparator);
      res.push(msg.join("\n"));
    }
    res.push(texts.messageResultQ(q));
    res.push(texts.messageSeparator);
    res.push(`${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`);

    return res.join("\n");
  };

const transformVideoList:
  (items: youtube_v3.Schema$Video[]) => string =
  (items: youtube_v3.Schema$Video[]): string => {
    if (items.length === 0) {
      return texts.messageNoResult;
    }
    const res: string[] = [];
    for (let index: number = items.length; index > 0; index--) {
      const value: youtube_v3.Schema$Video = items[index - 1];
      const msg: string[] = [];
      if (value.snippet !== undefined && value.snippet.title !== undefined) {
        msg.push(`${index}. ${value.snippet.title}`);
      }
      if (value.id !== undefined) {
        const videoId: string = encode(value.id);
        msg.push(`${icons.inboxTray} /${texts.commandDownload}${texts.commandSeparator}${videoId}`);
      }
      msg.push(texts.messageSeparator);
      res.push(msg.join("\n"));
    }
    res.push(texts.messageResultRelatedTo);
    res.push(texts.messageSeparator);
    res.push(`${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`);

    return res.join("\n");
  };

export {
  caption,
  decode,
  encode,
  pathThumb,
  pathVideo,
  transformSearchList,
  transformVideoList,
};
