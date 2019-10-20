import { youtube_v3 } from "googleapis";

import * as icons from "../config/icons";
import * as texts from "../config/texts";

import {
  // Caption,
  // Decode,
  // Encode,
  // PathThumb,
  // PathVideo,
  transformSearchList,
  transformVideoList
} from "./string";

describe("string utils", (): void => {
  // Const query: string = "E0yxlqfXfEY";
  // Const result: string = "RTB5eGxxZlhmRVk";

  // Test("should handle caption", (): void => {
  //   Expect(caption("")).toEqual("🆔 @melodio");
  // });

  // Test("should handle decode", (): void => {
  //   Expect(decode(result)).toEqual(query);
  // });

  // Test("should handle encode", (): void => {
  //   Expect(encode(query)).toEqual(result);
  // });

  // Test("should handle pathThumb", (): void => {
  //   Expect(pathThumb(query)).toContain(`${result}.jpg`);
  // });

  // Test("should handle pathVideo", (): void => {
  //   Expect(pathVideo(query)).toContain(`${result}.mp4`);
  // });

  test("should handle transformSearchList items length", (): void => {
    const q: string = "";
    const items: youtube_v3.Schema$SearchResult[] = [];
    expect(transformSearchList(items, q)).toEqual(texts.messageNoResult);
  });

  test("should handle transformSearchList snippet", (): void => {
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
    res.push(
      [
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

  // Test("should handle transformSearchList snippet title", (): void => {
  //   Const q: string = "";
  //   Const items: youtube_v3.Schema$SearchResult[] = [
  //     {
  //       Id: {
  //         VideoId: ""
  //       },
  //       Snippet: {
  //         Title: undefined
  //       }
  //     }
  //   ];
  //   Const res: string[] = [];
  //   Res.push(
  //     [
  //       `${icons.inboxTray} /${texts.commandDownload}${texts.commandSeparator}`
  //     ].join("\n")
  //   );
  //   Res.push(texts.messageSeparator);
  //   Res.push(texts.messageResultQ(q));
  //   Res.push(texts.messageSeparator);
  //   Res.push(
  //     `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
  //   );
  //   Expect(transformSearchList(items, q)).toEqual(res.join("\n"));
  // });

  test("should handle transformSearchList id", (): void => {
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
    res.push(["1. "].join("\n"));
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    res.push(texts.messageSeparator);
    res.push(
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformSearchList(items, q)).toEqual(res.join("\n"));
  });

  // Test("should handle transformSearchList id videoId", (): void => {
  //   Const q: string = "";
  //   Const items: youtube_v3.Schema$SearchResult[] = [
  //     {
  //       Id: {
  //         VideoId: undefined
  //       },
  //       Snippet: {
  //         Title: ""
  //       }
  //     }
  //   ];
  //   Const res: string[] = [];
  //   Res.push(["1. "].join("\n"));
  //   Res.push(texts.messageSeparator);
  //   Res.push(texts.messageResultQ(q));
  //   Res.push(texts.messageSeparator);
  //   Res.push(
  //     `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
  //   );
  //   Expect(transformSearchList(items, q)).toEqual(res.join("\n"));
  // });

  // Test("should handle transformSearchList", (): void => {
  //   Const q: string = "";
  //   Const items: youtube_v3.Schema$SearchResult[] = [
  //     {
  //       Id: {
  //         VideoId: ""
  //       },
  //       Snippet: {
  //         Title: ""
  //       }
  //     }
  //   ];
  //   Const res: string[] = [];
  //   Res.push(
  //     [
  //       "1. ",
  //       `${icons.inboxTray} /${texts.commandDownload}${texts.commandSeparator}`
  //     ].join("\n")
  //   );
  //   Res.push(texts.messageSeparator);
  //   Res.push(texts.messageResultQ(q));
  //   Res.push(texts.messageSeparator);
  //   Res.push(
  //     `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
  //   );
  //   Expect(transformSearchList(items, q)).toEqual(res.join("\n"));
  // });

  test("should handle transformVideoList items length", (): void => {
    const items: youtube_v3.Schema$Video[] = [];
    expect(transformVideoList(items)).toEqual(texts.messageNoResult);
  });

  test("should handle transformVideoList snippet", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        id: "",
        snippet: undefined
      }
    ];
    const res: string[] = [];
    res.push(
      [
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

  // Test("should handle transformVideoList snippet title", (): void => {
  //   Const items: youtube_v3.Schema$Video[] = [
  //     {
  //       Id: "",
  //       Snippet: {
  //         Title: undefined
  //       }
  //     }
  //   ];
  //   Const res: string[] = [];
  //   Res.push(
  //     [
  //       `${icons.inboxTray} /${texts.commandDownload}${texts.commandSeparator}`
  //     ].join("\n")
  //   );
  //   Res.push(texts.messageSeparator);
  //   Res.push(texts.messageResultRelatedTo);
  //   Res.push(texts.messageSeparator);
  //   Res.push(
  //     `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
  //   );
  //   Expect(transformVideoList(items)).toEqual(res.join("\n"));
  // });

  test("should handle transformVideoList id", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        id: undefined,
        snippet: {
          title: ""
        }
      }
    ];
    const res: string[] = [];
    res.push(["1. "].join("\n"));
    res.push(texts.messageSeparator);
    res.push(texts.messageResultRelatedTo);
    res.push(texts.messageSeparator);
    res.push(
      `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
    );
    expect(transformVideoList(items)).toEqual(res.join("\n"));
  });

  // Test("should handle transformVideoList", (): void => {
  //   Const items: youtube_v3.Schema$Video[] = [
  //     {
  //       Id: "",
  //       Snippet: {
  //         Title: ""
  //       }
  //     }
  //   ];
  //   Const res: string[] = [];
  //   Res.push(
  //     [
  //       "1. ",
  //       `${icons.inboxTray} /${texts.commandDownload}${texts.commandSeparator}`
  //     ].join("\n")
  //   );
  //   Res.push(texts.messageSeparator);
  //   Res.push(texts.messageResultRelatedTo);
  //   Res.push(texts.messageSeparator);
  //   Res.push(
  //     `${icons.backhandIndexFingerPointingRight} <a href='${texts.messageAdvertisementChannelJoinLink}'>${texts.messageAdvertisementChannel}</a> ${icons.backhandIndexFingerPointingLeft}`
  //   );
  //   Expect(transformVideoList(items)).toEqual(res.join("\n"));
  // });
});
