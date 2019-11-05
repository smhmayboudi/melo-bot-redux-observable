import { youtube_v3 } from "googleapis";

import { transformSearchResults } from "./inlineQueryResultArticle";

describe("inlineQueryResultArticle utils", (): void => {
  test("should handle transformSearchResults items length", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [];
    expect(transformSearchResults(items, q)).toEqual([]);
  });

  test("should handle transformSearchResults id undefined", (): void => {
    const q = "";
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
    expect(transformSearchResults(items, q)).toEqual([]);
  });

  test("should handle transformSearchResults id videoId undefined", (): void => {
    const q = "";
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
    expect(transformSearchResults(items, q)).toEqual([]);
  });

  test("should handle transformSearchResults id videoId null", (): void => {
    const q = "";
    const items: youtube_v3.Schema$SearchResult[] = [
      {
        id: {
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
    expect(transformSearchResults(items, q)).toEqual([]);
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
    expect(transformSearchResults(items, q)).toEqual([]);
  });

  test("should handle transformSearchResults snippet thumbnails undefined", (): void => {
    const q = "";
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
    expect(transformSearchResults(items, q)).toEqual([]);
  });

  test("should handle transformSearchResults snippet thumbnails default undefined", (): void => {
    const q = "";
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
    expect(transformSearchResults(items, q)).toEqual([]);
  });

  test("should handle transformSearchResults snippet title undefined", (): void => {
    const q = "";
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
    expect(transformSearchResults(items, q)).toEqual([]);
  });

  test("should handle transformSearchResults", (): void => {
    const q = "";
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
    expect(transformSearchResults(items, q)).toEqual([]);
  });
});
