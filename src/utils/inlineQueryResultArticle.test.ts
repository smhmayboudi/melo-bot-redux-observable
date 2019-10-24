import { youtube_v3 } from "googleapis";

import { transformSearchList } from "./inlineQueryResultArticle";

describe("inlineQueryResultArticle utils", (): void => {
  test("should handle transformSearchList items length", (): void => {
    const q: string = "";
    const items: youtube_v3.Schema$SearchResult[] = [];
    expect(transformSearchList(items, q)).toEqual([]);
  });

  test("should handle transformSearchList id undefined", (): void => {
    const q: string = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: undefined,
        snippet: {
          thumbnails: {
            default: {}
          },
          title: ""
        }
      }
    ];
    expect(transformSearchList(items, q)).toEqual([]);
  });

  test("should handle transformSearchList id videoId undefined", (): void => {
    const q: string = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
          videoId: undefined
        },
        snippet: {
          thumbnails: {
            default: {}
          },
          title: ""
        }
      }
    ];
    expect(transformSearchList(items, q)).toEqual([]);
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
          thumbnails: {
            default: {}
          },
          title: ""
        }
      }
    ];
    expect(transformSearchList(items, q)).toEqual([]);
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
    expect(transformSearchList(items, q)).toEqual([]);
  });

  test("should handle transformSearchList snippet thumbnails undefined", (): void => {
    const q: string = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
          videoId: ""
        },
        snippet: {
          thumbnails: undefined,
          title: ""
        }
      }
    ];
    expect(transformSearchList(items, q)).toEqual([]);
  });

  test("should handle transformSearchList snippet thumbnails default undefined", (): void => {
    const q: string = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
          videoId: ""
        },
        snippet: {
          thumbnails: {
            default: undefined
          },
          title: ""
        }
      }
    ];
    expect(transformSearchList(items, q)).toEqual([]);
  });

  test("should handle transformSearchList snippet title undefined", (): void => {
    const q: string = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
          videoId: ""
        },
        snippet: {
          thumbnails: {
            default: {}
          },
          title: undefined
        }
      }
    ];
    expect(transformSearchList(items, q)).toEqual([]);
  });

  test("should handle transformSearchList", (): void => {
    const q: string = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
          videoId: ""
        },
        snippet: {
          thumbnails: {
            default: {}
          },
          title: ""
        }
      }
    ];
    expect(transformSearchList(items, q)).toEqual([]);
  });
});
