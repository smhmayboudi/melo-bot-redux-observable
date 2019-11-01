import { youtube_v3 } from "googleapis";
import * as path from "path";

import { findByCode } from "../configs/emojis";
import * as texts from "../configs/texts";

const caption: (title: string) => string = (title?: string): string =>
  `${title}\n\n${findByCode("1F194").char} @melodio`.trim();

const decode: (id: string) => string = (id: string): string =>
  Buffer.from(id, "base64").toString("ascii");

const encode: (id: string) => string = (id: string): string =>
  Buffer.from(id)
    .toString("base64")
    .replace(/=/g, "");

const pathThumb: (id: string) => string = (id: string): string =>
  path.resolve(__dirname, "../../asset", `${encode(id)}.jpg`);

const pathVideo: (id: string) => string = (id: string): string =>
  path.resolve(__dirname, "../../asset", `${encode(id)}.mp4`);

const transformSearchResultCaption: (
  item: youtube_v3.Schema$SearchResult
) => string = (item: youtube_v3.Schema$SearchResult): string => {
  const res: string[] = [];
  if (
    item.id !== undefined &&
    item.id.videoId !== undefined &&
    item.id.videoId !== null &&
    item.snippet !== undefined &&
    item.snippet.title !== undefined &&
    item.snippet.description !== undefined
  ) {
    const videoId: string = encode(item.id.videoId);
    res.push(`${item.snippet.title}`);
    res.push(`${item.snippet.description}`);
    res.push("");
    res.push(
      `${findByCode("1F4E5").char} /${texts.commandDownload}${
        texts.commandSeparator
      }${videoId}`
    );
    res.push(
      `${findByCode("1F517").char} /${texts.commandRelatedToVideoId}${
        texts.commandSeparator
      }${videoId}`
    );
  }
  res.push("");
  res.push(
    `${findByCode("1F449").char} <a href="${
      texts.messageAdvertisementChannelJoinLink
    }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
  );

  return res.join("\n");
};

const transformSearchResults: (
  items: youtube_v3.Schema$SearchResult[],
  q: string
) => string = (items: youtube_v3.Schema$SearchResult[], q: string): string => {
  const res: string[] = [];
  if (items.length === 0) {
    return texts.messageNoResult;
  }
  for (let index: number = items.length; index > 0; index = index - 1) {
    const value: youtube_v3.Schema$SearchResult = items[index - 1];
    const msg: string[] = [];
    if (
      value.id !== undefined &&
      value.id.videoId !== undefined &&
      value.id.videoId !== null &&
      value.snippet !== undefined &&
      value.snippet.title !== undefined
    ) {
      const videoId: string = encode(value.id.videoId);
      msg.push(`${index}. ${value.snippet.title}`);
      msg.push(
        `${findByCode("1F4E5").char} /${texts.commandDownload}${
          texts.commandSeparator
        }${videoId}`
      );
      msg.push(
        `${findByCode("1F517").char} /${texts.commandRelatedToVideoId}${
          texts.commandSeparator
        }${videoId}`
      );
    }
    msg.push(texts.messageSeparator);
    res.push(msg.join("\n"));
  }
  res.push(texts.messageResultQ(q));
  res.push(texts.messageSeparator);
  res.push(
    `${findByCode("1F449").char} <a href="${
      texts.messageAdvertisementChannelJoinLink
    }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
  );

  return res.join("\n");
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

const transformVideoCaption: (item: youtube_v3.Schema$Video) => string = (
  item: youtube_v3.Schema$Video
): string => {
  const res: string[] = [];
  if (
    item.id !== undefined &&
    item.id !== null &&
    item.snippet !== undefined &&
    item.snippet.title !== undefined &&
    item.snippet.description !== undefined
  ) {
    const videoId: string = encode(item.id);
    res.push(`${item.snippet.title}`);
    res.push(`${item.snippet.description}`);
    res.push("");
    res.push(
      `${findByCode("1F4E5").char} /${texts.commandDownload}${
        texts.commandSeparator
      }${videoId}`
    );
    res.push(
      `${findByCode("1F517").char} /${texts.commandRelatedToVideoId}${
        texts.commandSeparator
      }${videoId}`
    );
  }
  res.push("");
  res.push(
    `${findByCode("1F449").char} <a href="${
      texts.messageAdvertisementChannelJoinLink
    }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
  );

  return res.join("\n");
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
      value.snippet.title !== undefined
    ) {
      const videoId: string = encode(value.id);
      msg.push(`${index}. ${value.snippet.title}`);
      msg.push(
        `${findByCode("1F4E5").char} /${texts.commandDownload}${
          texts.commandSeparator
        }${videoId}`
      );
      msg.push(
        `${findByCode("1F517").char} /${texts.commandRelatedToVideoId}${
          texts.commandSeparator
        }${videoId}`
      );
    }
    msg.push(texts.messageSeparator);
    res.push(msg.join("\n"));
  }
  res.push(texts.messageResultRelatedTo(chart));
  res.push(texts.messageSeparator);
  res.push(
    `${findByCode("1F449").char} <a href="${
      texts.messageAdvertisementChannelJoinLink
    }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
  );

  return res.join("\n");
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
  transformSearchResultCaption,
  transformSearchResults,
  transformSearchResultUrl,
  transformVideoCaption,
  transformVideos,
  transformVideoThumbnailUrl
};
