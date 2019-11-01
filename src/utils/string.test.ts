import { youtube_v3 } from "googleapis";

import { findByCode } from "../configs/emojis";
import * as texts from "../configs/texts";

import {
  caption,
  decode,
  encode,
  pathThumb,
  pathVideo,
  transformSearchResults,
  transformVideos
} from "./string";

describe("string utils", (): void => {
  const query = "E0yxlqfXfEY";
  const result = "RTB5eGxxZlhmRVk";

  test("should handle caption", (): void => {
    expect(caption("")).toEqual("🆔 @melodio");
  });

  test("should handle decode", (): void => {
    expect(decode(result)).toEqual(query);
  });

  test("should handle encode", (): void => {
    expect(encode(query)).toEqual(result);
  });

  test("should handle pathThumb", (): void => {
    expect(pathThumb(query)).toContain(`${result}.jpg`);
  });

  test("should handle pathVideo", (): void => {
    expect(pathVideo(query)).toContain(`${result}.mp4`);
  });

  test("should handle transformSearchResults items length", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [];
    expect(transformSearchResults(items, q)).toEqual(texts.messageNoResult);
  });

  test("should handle transformSearchResults id undefined", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: undefined,
        snippet: {
          title: ""
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformSearchResults(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformSearchResults id videoId undefined", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
          videoId: undefined
        },
        snippet: {
          title: ""
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformSearchResults(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformSearchResults id videoId null", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
          // tslint:disable-next-line: no-null-keyword
          videoId: null
        },
        snippet: {
          title: ""
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformSearchResults(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformSearchResults snippet undefined", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
          videoId: ""
        },
        snippet: undefined
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformSearchResults(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformSearchResults snippet title undefined", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
          videoId: ""
        },
        snippet: {
          title: undefined
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformSearchResults(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformSearchResults", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
          videoId: ""
        },
        snippet: {
          title: ""
        }
      }
    ];
    const res: string[] = [];
    res.push(
      [
        "1. ",
        `${findByCode("1F4E5").char} /${texts.commandDownload}${
          texts.commandSeparator
        }`
      ].join("\n")
    );
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformSearchResults(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformVideos items length", (): void => {
    const items: youtube_v3.Schema$Video[] = [];
    expect(transformVideos(items)).toEqual(texts.messageNoResult);
  });

  test("should handle transformVideos id undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        id: undefined,
        snippet: {
          title: ""
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultRelatedTo);
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformVideos(items)).toEqual(res.join("\n"));
  });

  test("should handle transformVideos id null", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        // tslint:disable-next-line: no-null-keyword
        id: null,
        snippet: {
          title: ""
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultRelatedTo);
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformVideos(items)).toEqual(res.join("\n"));
  });

  test("should handle transformVideos snippet undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        id: "",
        snippet: undefined
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultRelatedTo);
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformVideos(items)).toEqual(res.join("\n"));
  });

  test("should handle transformVideos snippet title undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        id: "",
        snippet: {
          title: undefined
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultRelatedTo);
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformVideos(items)).toEqual(res.join("\n"));
  });

  test("should handle transformVideos", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        id: "",
        snippet: {
          title: ""
        }
      }
    ];
    const res: string[] = [];
    res.push(
      [
        "1. ",
        `${findByCode("1F4E5").char} /${texts.commandDownload}${
          texts.commandSeparator
        }`
      ].join("\n")
    );
    res.push(texts.messageSeparator);
    res.push(texts.messageResultRelatedTo);
    res.push(texts.messageSeparator);
    res.push(
      `${findByCode("1F449").char} <a href="${
        texts.messageAdvertisementChannelJoinLink
      }">${texts.messageAdvertisementChannel}</a> ${findByCode("1F448").char}`
    );
    expect(transformVideos(items)).toEqual(res.join("\n"));
  });
});
