import { youtube_v3 } from "googleapis";

import * as icons from "../configs/icons";
import * as texts from "../configs/texts";

import {
  caption,
  decode,
  encode,
  pathThumb,
  pathVideo,
  transformSearchList,
  transformVideoList
} from "./string";

describe("string utils", (): void => {
  const query: string = "E0yxlqfXfEY";
  const result: string = "RTB5eGxxZlhmRVk";

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

  test("should handle transformSearchList items length", (): void => {
    const q: string = "";
    const items: youtube_v3.Schema$SearchResult[] = [];
    expect(transformSearchList(items, q)).toEqual(texts.messageNoResult);
  });

  test("should handle transformSearchList id undefined", (): void => {
    const q: string = "";
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
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformSearchList(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformSearchList id videoId undefined", (): void => {
    const q: string = "";
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
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformSearchList(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformSearchList id videoId null", (): void => {
    const q: string = "";
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
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformSearchList(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformSearchList snippet undefined", (): void => {
    const q: string = "";
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
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformSearchList(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformSearchList snippet title undefined", (): void => {
    const q: string = "";
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
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformSearchList(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformSearchList", (): void => {
    const q: string = "";
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
        `${icons.inboxTray} /${texts.commandDownload}${texts.commandSeparator}`
      ].join("\n")
    );
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    res.push(texts.messageSeparator);
    res.push(
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformSearchList(items, q)).toEqual(res.join("\n"));
  });

  test("should handle transformVideoList items length", (): void => {
    const items: youtube_v3.Schema$Video[] = [];
    expect(transformVideoList(items)).toEqual(texts.messageNoResult);
  });

  test("should handle transformVideoList id undefined", (): void => {
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
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformVideoList(items)).toEqual(res.join("\n"));
  });

  test("should handle transformVideoList id null", (): void => {
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
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformVideoList(items)).toEqual(res.join("\n"));
  });

  test("should handle transformVideoList snippet undefined", (): void => {
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
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformVideoList(items)).toEqual(res.join("\n"));
  });

  test("should handle transformVideoList snippet title undefined", (): void => {
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
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformVideoList(items)).toEqual(res.join("\n"));
  });

  test("should handle transformVideoList", (): void => {
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
        `${icons.inboxTray} /${texts.commandDownload}${texts.commandSeparator}`
      ].join("\n")
    );
    res.push(texts.messageSeparator);
    res.push(texts.messageResultRelatedTo);
    res.push(texts.messageSeparator);
    res.push(
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformVideoList(items)).toEqual(res.join("\n"));
  });
});
