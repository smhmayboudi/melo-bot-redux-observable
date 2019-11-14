import { youtube_v3 } from "googleapis";

import {
  transformSearchResults,
  transformVideos
} from "./inlineQueryResultArticle";

import * as texts from "../configs/texts";

describe("inlineQueryResultArticle utils", (): void => {
  const searchResultItem = {
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
  const videoItem = {
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

  test("should handle transformSearchResults items length", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults id undefined", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        id: undefined
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults id videoId null", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        id: {
          videoId: null
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults id videoId undefined", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        id: {
          videoId: undefined
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet undefined", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: undefined
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet description null", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          description: null
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet description undefined", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          description: undefined
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet thumbnails undefined", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          thumbnails: undefined
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet thumbnails default undefined", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          thumbnails: {
            ...searchResultItem.snippet.thumbnails,
            default: undefined
          }
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet thumbnails default height null", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          thumbnails: {
            ...searchResultItem.snippet.thumbnails,
            default: {
              ...searchResultItem.snippet.thumbnails.default,
              height: null
            }
          }
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet thumbnails default height undefined", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          thumbnails: {
            ...searchResultItem.snippet.thumbnails,
            default: {
              ...searchResultItem.snippet.thumbnails.default,
              height: undefined
            }
          }
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet thumbnails default url null", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          thumbnails: {
            ...searchResultItem.snippet.thumbnails,
            default: {
              ...searchResultItem.snippet.thumbnails.default,
              url: null
            }
          }
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet thumbnails default url undefined", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          thumbnails: {
            ...searchResultItem.snippet.thumbnails,
            default: {
              ...searchResultItem.snippet.thumbnails.default,
              url: undefined
            }
          }
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet thumbnails default width null", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          thumbnails: {
            ...searchResultItem.snippet.thumbnails,
            default: {
              ...searchResultItem.snippet.thumbnails.default,
              width: null
            }
          }
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet thumbnails default width undefined", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          thumbnails: {
            ...searchResultItem.snippet.thumbnails,
            default: {
              ...searchResultItem.snippet.thumbnails.default,
              width: undefined
            }
          }
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet title null", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          title: null
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults snippet title undefined", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem,
        snippet: {
          ...searchResultItem.snippet,
          title: undefined
        }
      }
    ];
    expect(transformSearchResults(items)).toEqual([]);
  });

  test("should handle transformSearchResults", (): void => {
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        ...searchResultItem
      }
    ];
    expect(transformSearchResults(items)).toEqual([
      {
        description: "",
        hide_url: false,
        id: "",
        input_message_content: {
          disable_web_page_preview: true,
          message_text: `/${texts.commandDownload}${texts.commandSeparator}`,
          parse_mode: "HTML"
        },
        reply_markup: {
          inline_keyboard: [
            [
              {
                callback_data: "callback_data:OK",
                text: "OK"
              },
              {
                callback_data: "callback_data:NOK",
                text: "NOK"
              }
            ]
          ]
        },
        thumb_height: 0,
        thumb_url: "",
        thumb_width: 0,
        title: "",
        type: "article"
      }
    ]);
  });

  test("should handle transformVideos items length", (): void => {
    const items: youtube_v3.Schema$Video[] = [];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos id null", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        id: null
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos id undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        id: undefined
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        id: "",
        snippet: undefined
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet description null", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          description: null
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet description undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          description: undefined
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet thumbnails undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          thumbnails: undefined
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet thumbnails default undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          thumbnails: {
            ...videoItem.snippet.thumbnails,
            default: undefined
          }
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet thumbnails default height null", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          thumbnails: {
            ...videoItem.snippet.thumbnails,
            default: {
              ...videoItem.snippet.thumbnails.default,
              height: null
            }
          }
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet thumbnails default height undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          thumbnails: {
            ...videoItem.snippet.thumbnails,
            default: {
              ...videoItem.snippet.thumbnails.default,
              height: undefined
            }
          }
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet thumbnails default url null", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          thumbnails: {
            ...videoItem.snippet.thumbnails,
            default: {
              ...videoItem.snippet.thumbnails.default,
              url: null
            }
          }
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet thumbnails default url undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          thumbnails: {
            ...videoItem.snippet.thumbnails,
            default: {
              ...videoItem.snippet.thumbnails.default,
              url: undefined
            }
          }
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet thumbnails default width null", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          thumbnails: {
            ...videoItem.snippet.thumbnails,
            default: {
              ...videoItem.snippet.thumbnails.default,
              width: null
            }
          }
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet thumbnails default width undefined", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          thumbnails: {
            ...videoItem.snippet.thumbnails,
            default: {
              ...videoItem.snippet.thumbnails.default,
              width: undefined
            }
          }
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos snippet title null", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem,
        snippet: {
          ...videoItem.snippet,
          title: null
        }
      }
    ];
    expect(transformVideos(items)).toEqual([]);
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
    expect(transformVideos(items)).toEqual([]);
  });

  test("should handle transformVideos", (): void => {
    const items: youtube_v3.Schema$Video[] = [
      {
        ...videoItem
      }
    ];
    expect(transformVideos(items)).toEqual([
      {
        description: "",
        hide_url: false,
        id: "",
        input_message_content: {
          disable_web_page_preview: true,
          message_text: `/${texts.commandDownload}${texts.commandSeparator}`,
          parse_mode: "HTML"
        },
        reply_markup: {
          inline_keyboard: [
            [
              {
                callback_data: "callback_data:OK",
                text: "OK"
              },
              {
                callback_data: "callback_data:NOK",
                text: "NOK"
              }
            ]
          ]
        },
        thumb_height: 0,
        thumb_url: "",
        thumb_width: 0,
        title: "",
        type: "article"
      }
    ]);
  });
});
