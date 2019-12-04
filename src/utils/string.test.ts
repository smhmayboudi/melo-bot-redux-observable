import { youtube_v3 } from "googleapis";
import * as path from "path";

import { IStateShortenListResult } from "../../types/iStateShortenListResult";
import { findByCode } from "../configs/emojis";
import * as env from "../configs/env";
import * as texts from "../configs/texts";
import * as command from "../utils/command";
import {
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
} from "./string";

describe("string utils", (): void => {
  const searchResultItem: youtube_v3.Schema$SearchResult = {
    id: {
      videoId: ""
    },
    snippet: {
      description: "",
      thumbnails: {
        default: {
          height: 0,
          url: "",
          width: 0
        },
        high: {
          height: 0,
          url: "",
          width: 0
        },
        maxres: {
          height: 0,
          url: "",
          width: 0
        },
        medium: {
          height: 0,
          url: "",
          width: 0
        },
        standard: {
          height: 0,
          url: "",
          width: 0
        }
      },
      title: ""
    }
  };
  const videoItem: youtube_v3.Schema$Video = {
    id: "",
    snippet: {
      description: "",
      thumbnails: {
        default: {
          height: 0,
          url: "",
          width: 0
        },
        high: {
          height: 0,
          url: "",
          width: 0
        },
        maxres: {
          height: 0,
          url: "",
          width: 0
        },
        medium: {
          height: 0,
          url: "",
          width: 0
        },
        standard: {
          height: 0,
          url: "",
          width: 0
        }
      },
      title: ""
    }
  };

  test("should handle caption", (): void => {
    expect(caption("")).toEqual(
      `\n\n${findByCode("1F194").char} <a href="${env.CHANNEL_JOIN_LINK}">@${
        env.CHANNEL
      }</a>`
    );
  });

  test("should handle decode", (): void => {
    expect(decode("ChYvcmwgQ2d0R2EwMVFkSGd5VW10Q2F3", "Start")).toEqual({
      cmd: "/rl CgtGa01QdHgyUmtCaw"
    });
  });

  test("should handle encode", (): void => {
    expect(
      encode(
        {
          cmd: "/rl CgtGa01QdHgyUmtCaw"
        },
        "Start"
      )
    ).toEqual("ChYvcmwgQ2d0R2EwMVFkSGd5VW10Q2F3");
  });

  test("should handle pathThumb", (): void => {
    expect(pathThumb("E0yxlqfXfEY")).toEqual(
      path.resolve(__dirname, "../../asset", `${"E0yxlqfXfEY"}.jpg`)
    );
  });

  test("should handle pathVideo", (): void => {
    expect(pathVideo("E0yxlqfXfEY")).toEqual(
      path.resolve(__dirname, "../../asset", `${"E0yxlqfXfEY"}.mp4`)
    );
  });

  test("should handle text", (): void => {
    expect(text("")).toEqual(
      `\n\n${findByCode("1F194").char} <a href="${env.CHANNEL_JOIN_LINK}">@${
        env.CHANNEL
      }</a>`
    );
  });

  test("should handle transformSearchResultCaption id undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      id: undefined
    };
    expect(transformSearchResultCaption(item)).toEqual(caption(""));
  });

  test("should handle transformSearchResultCaption id videoId null", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      id: {
        ...searchResultItem.id,
        videoId: null
      }
    };
    expect(transformSearchResultCaption(item)).toEqual(caption(""));
  });

  test("should handle transformSearchResultCaption id videoId undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      id: {
        ...searchResultItem.id,
        videoId: undefined
      }
    };
    expect(transformSearchResultCaption(item)).toEqual(caption(""));
  });

  test("should handle transformSearchResultCaption snippet undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: undefined
    };
    expect(transformSearchResultCaption(item)).toEqual(caption(""));
  });

  test("should handle transformSearchResultCaption snippet title null", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        title: null
      }
    };
    expect(transformSearchResultCaption(item)).toEqual(caption(""));
  });

  test("should handle transformSearchResultCaption snippet title undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        title: undefined
      }
    };
    expect(transformSearchResultCaption(item)).toEqual(caption(""));
  });

  test("should handle transformSearchResultCaption snippet description null", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        description: null
      }
    };
    expect(transformSearchResultCaption(item)).toEqual(caption(""));
  });

  test("should handle transformSearchResultCaption snippet description undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        description: undefined
      }
    };
    expect(transformSearchResultCaption(item)).toEqual(caption(""));
  });

  test("should handle transformSearchResultCaption", (): void => {
    const item: youtube_v3.Schema$SearchResult = searchResultItem;
    const res: string[] = [];
    res.push("");
    res.push("");
    res.push("");
    res.push(`${findByCode("1F4E5").char} ${command.download({ id: "" })}`);
    res.push(
      `${findByCode("1F517").char} ${command.relatedToVideoId({ id: "" })}`
    );
    expect(transformSearchResultCaption(item)).toEqual(caption(res.join("\n")));
  });

  test("should handle transformSearchResultUrl snippet thumbnails standard undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          standard: undefined
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails standard url null", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          standard: {
            ...((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).standard,
            url: null
          }
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails standard url undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          standard: {
            ...((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).standard,
            url: undefined
          }
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails standard url", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          standard: ((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
            .thumbnails as youtube_v3.Schema$ThumbnailDetails).standard
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails high undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          high: undefined
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails high url null", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          high: {
            ...((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).high,
            url: null
          }
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails high url undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          high: {
            ...((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).high,
            url: undefined
          }
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails high url", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          high: ((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
            .thumbnails as youtube_v3.Schema$ThumbnailDetails).high
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails medium undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          medium: undefined
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails medium url null", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          medium: {
            ...((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).medium,
            url: null
          }
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails medium url undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          medium: {
            ...((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).medium,
            url: undefined
          }
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails medium url", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          medium: ((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
            .thumbnails as youtube_v3.Schema$ThumbnailDetails).medium
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails default undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          default: undefined
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails default url null", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          default: {
            ...((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).default,
            url: null
          }
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails default url undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          default: {
            ...((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).default,
            url: undefined
          }
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails default url", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          default: ((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
            .thumbnails as youtube_v3.Schema$ThumbnailDetails).default
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResults items length", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [];
    expect(transformSearchResults(items, q, undefined)).toEqual(
      texts.messageNoResult
    );
  });

  test("should handle transformSearchResults id undefined", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        id: undefined
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    expect(transformSearchResults(items, q, undefined)).toEqual(
      text(res.join("\n"))
    );
  });

  test("should handle transformSearchResults id videoId undefined", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        id: {
          ...searchResultItem.id,
          videoId: undefined
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    expect(transformSearchResults(items, q, undefined)).toEqual(
      text(res.join("\n"))
    );
  });

  test("should handle transformSearchResults id videoId null", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        id: {
          ...searchResultItem.id,
          videoId: null
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    expect(transformSearchResults(items, q, undefined)).toEqual(
      text(res.join("\n"))
    );
  });

  test("should handle transformSearchResults snippet undefined", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: undefined
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    expect(transformSearchResults(items, q, undefined)).toEqual(
      text(res.join("\n"))
    );
  });

  test("should handle transformSearchResults snippet title undefined", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          title: undefined
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    expect(transformSearchResults(items, q, undefined)).toEqual(
      text(res.join("\n"))
    );
  });

  test("should handle transformSearchResults", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [searchResultItem];
    const res: string[] = [];
    res.push(
      [
        "1. ",
        `${findByCode("1F4E5").char} ${command.download({ id: "" })}`,
        `${findByCode("1F517").char} ${command.relatedToVideoId({ id: "" })}`
      ].join("\n")
    );
    res.push(texts.messageSeparator);
    expect(transformSearchResults(items, undefined, undefined)).toEqual(
      text(res.join("\n"))
    );
  });

  test("should handle transformSearchResults q", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [searchResultItem];
    const res: string[] = [];
    res.push(
      [
        "1. ",
        `${findByCode("1F4E5").char} ${command.download({ id: "" })}`,
        `${findByCode("1F517").char} ${command.relatedToVideoId({ id: "" })}`
      ].join("\n")
    );
    res.push(texts.messageSeparator);
    res.push(texts.messageResultQ(q));
    expect(transformSearchResults(items, q, undefined)).toEqual(
      text(res.join("\n"))
    );
  });

  test("should handle transformSearchResults relatedToVideoId", (): void => {
    const relatedToVideoId = "";
    const items: youtube_v3.Schema$SearchResult[] = [searchResultItem];
    const res: string[] = [];
    res.push(
      [
        "1. ",
        `${findByCode("1F4E5").char} ${command.download({ id: "" })}`,
        `${findByCode("1F517").char} ${command.relatedToVideoId({ id: "" })}`
      ].join("\n")
    );
    res.push(texts.messageSeparator);
    res.push(texts.messageResultRelatedToVideoId(relatedToVideoId));
    expect(transformSearchResults(items, undefined, relatedToVideoId)).toEqual(
      text(res.join("\n"))
    );
  });

  test("should handle transformSearchResultUrl snippet undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: undefined
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: undefined
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails maxres undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          maxres: undefined
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails maxres url null", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          maxres: {
            ...((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).maxres,
            url: null
          }
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails maxres url undefined", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          maxres: {
            ...((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).maxres,
            url: undefined
          }
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformSearchResultUrl snippet thumbnails maxres url", (): void => {
    const item: youtube_v3.Schema$SearchResult = {
      ...searchResultItem,
      snippet: {
        ...searchResultItem.snippet,
        thumbnails: {
          maxres: ((searchResultItem.snippet as youtube_v3.Schema$SearchResultSnippet)
            .thumbnails as youtube_v3.Schema$ThumbnailDetails).maxres
        }
      }
    };
    expect(transformSearchResultUrl(item)).toEqual("");
  });

  test("should handle transformShortenList rows undefined", (): void => {
    expect(transformShortenList(undefined)).toEqual(texts.messageNoResult);
  });

  test("should handle transformShortenList rows length", (): void => {
    const rows: IStateShortenListResult[] = [];
    expect(transformShortenList(rows)).toEqual(texts.messageNoResult);
  });

  test("should handle transformShortenList", (): void => {
    const rows: IStateShortenListResult[] = [
      {
        alphabet: "",
        count: 0,
        date: null,
        id: 0,
        longLink: "",
        longBase64: null,
        shortLink: ""
      }
    ];
    const row: IStateShortenListResult = rows[0];
    const res: string[] = [];
    res.push(`<b>id</b>: ${row.id}`);
    res.push(`<b>shortLink</b>: ${row.shortLink}`);
    res.push(`<b>longLink</b>: ${row.longLink}`);
    res.push(`<b>longBase64</b>: ${row.longBase64}`);
    res.push(`<b>alphabet</b>: ${row.alphabet}`);
    res.push(`<b>count</b>: ${row.count}`);
    res.push(`<b>date</b>: ${row.date}`);
    res.push(command.shortenReset({ id: row.id }));
    res.push(texts.messageSeparator);
    expect(transformShortenList(rows)).toEqual(res.join("\n"));
  });

  test("should handle transformVideoCaption id null", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      id: null
    };
    expect(transformVideoCaption(item)).toEqual(caption(""));
  });

  test("should handle transformVideoCaption id undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      id: undefined
    };
    expect(transformVideoCaption(item)).toEqual(caption(""));
  });

  test("should handle transformVideoCaption snippet undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: undefined
    };
    expect(transformVideoCaption(item)).toEqual(caption(""));
  });

  test("should handle transformVideoCaption snippet title null", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        title: null
      }
    };
    expect(transformVideoCaption(item)).toEqual(caption(""));
  });

  test("should handle transformVideoCaption snippet title undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        title: undefined
      }
    };
    expect(transformVideoCaption(item)).toEqual(caption(""));
  });

  test("should handle transformVideoCaption snippet description null", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        description: null
      }
    };
    expect(transformVideoCaption(item)).toEqual(caption(""));
  });

  test("should handle transformVideoCaption snippet description undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        description: undefined
      }
    };
    expect(transformVideoCaption(item)).toEqual(caption(""));
  });

  test("should handle transformVideoCaption", (): void => {
    const item: youtube_v3.Schema$Video = videoItem;
    const res: string[] = [];
    res.push("");
    res.push("");
    res.push("");
    res.push(`${findByCode("1F4E5").char} ${command.download({ id: "" })}`);
    res.push(
      `${findByCode("1F517").char} ${command.relatedToVideoId({ id: "" })}`
    );
    expect(transformVideoCaption(item)).toEqual(caption(res.join("\n")));
  });

  test("should handle transformVideos items length", (): void => {
    const items: youtube_v3.Schema$Video[] = [];
    expect(transformVideos(items, "")).toEqual(texts.messageNoResult);
  });

  test("should handle transformVideos id undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        id: undefined
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultChart(""));
    expect(transformVideos(items, "")).toEqual(text(res.join("\n")));
  });

  test("should handle transformVideos id null", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        id: null
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultChart(""));
    expect(transformVideos(items, "")).toEqual(text(res.join("\n")));
  });

  test("should handle transformVideos snippet undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: undefined
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultChart(""));
    expect(transformVideos(items, "")).toEqual(text(res.join("\n")));
  });

  test("should handle transformVideos snippet title undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          title: undefined
        }
      }
    ];
    const res: string[] = [];
    res.push(texts.messageSeparator);
    res.push(texts.messageResultChart(""));
    expect(transformVideos(items, "")).toEqual(text(res.join("\n")));
  });

  test("should handle transformVideos", (): void => {
    const items: youtube_v3.Schema$Video[] = [videoItem];
    const res: string[] = [];
    res.push(
      [
        "1. ",
        `${findByCode("1F4E5").char} ${command.download({ id: "" })}`,
        `${findByCode("1F517").char} ${command.relatedToVideoId({ id: "" })}`
      ].join("\n")
    );
    res.push(texts.messageSeparator);
    res.push(texts.messageResultChart(""));
    expect(transformVideos(items, "")).toEqual(text(res.join("\n")));
  });

  test("should handle transformVideoThumbnailUrl snippet undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: undefined
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: undefined
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails maxres undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          maxres: undefined
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails maxres url null", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          maxres: {
            ...((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).maxres,
            url: null
          }
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails maxres url undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          maxres: {
            ...((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).maxres,
            url: undefined
          }
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails maxres url", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          maxres: ((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
            .thumbnails as youtube_v3.Schema$ThumbnailDetails).maxres
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails standard undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          standard: undefined
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails standard url null", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          standard: {
            ...((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).standard,
            url: null
          }
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails standard url undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          standard: {
            ...((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).standard,
            url: undefined
          }
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails standard url", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          standard: ((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
            .thumbnails as youtube_v3.Schema$ThumbnailDetails).standard
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails high undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          high: undefined
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails high url null", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          high: {
            ...((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).high,
            url: null
          }
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails high url undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          high: {
            ...((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).high,
            url: undefined
          }
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails high url", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          high: ((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
            .thumbnails as youtube_v3.Schema$ThumbnailDetails).high
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails medium undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          medium: undefined
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails medium url null", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          medium: {
            ...((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).medium,
            url: null
          }
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails medium url undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          medium: {
            ...((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).medium,
            url: undefined
          }
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails medium url", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          medium: ((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
            .thumbnails as youtube_v3.Schema$ThumbnailDetails).medium
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails default undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          default: undefined
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails default url null", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          default: {
            ...((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).default,
            url: null
          }
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails default url undefined", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          default: {
            ...((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
              .thumbnails as youtube_v3.Schema$ThumbnailDetails).default,
            url: undefined
          }
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });

  test("should handle transformVideoThumbnailUrl snippet thumbnails default url", (): void => {
    const item: youtube_v3.Schema$Video = {
      ...videoItem,
      snippet: {
        ...videoItem.snippet,
        thumbnails: {
          default: ((videoItem.snippet as youtube_v3.Schema$VideoSnippet)
            .thumbnails as youtube_v3.Schema$ThumbnailDetails).default
        }
      }
    };
    expect(transformVideoThumbnailUrl(item)).toEqual("");
  });
});
