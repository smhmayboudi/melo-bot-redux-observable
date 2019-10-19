import * as fs from "fs";
import { Db, MongoClient } from "mongodb";
import { StateObservable } from "redux-observable";
import { Observable, of, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateGetChatMemberQuery } from "../../types/iStateGetChatMemberQuery";
import { IStateMessage } from "../../types/iStateMessage";
import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";
import { IVideoInfo } from "../../types/lib/iVideoInfo";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import { IVideo } from "../../types/telegramBot/types/iVideo";
import * as actions from "../actions";
import * as texts from "../config/texts";
import {
  collectionObservable,
  findOneObservable
} from "../lib/mongodbObservable";
import { caption, encode, pathThumb, pathVideo } from "../utils/string";

import * as epic from "./youtubeDownload";

jest.mock("fs");

describe("youtubeDownload epic", (): void => {
  const error: Error = new Error("");
  const initialState: IState = {
    getChatMember: actions.getChatMember.initialState,
    literate: actions.literate.initialState,
    message: actions.message.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendVideo: actions.sendVideo.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState
  };
  const state$ValueMessageQueryUndefined: IState = {
    ...initialState,
    message: {
      query: undefined
    },
    youtubeDownload: {
      query: undefined,
      result: undefined
    }
  };
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...initialState,
    message: {
      query: {
        message: undefined,
        update_id: 0
      }
    },
    youtubeDownload: {
      query: undefined,
      result: undefined
    }
  };
  const message: IStateMessage = {
    query: {
      message: {
        chat: {
          id: 0,
          type: ""
        },
        date: 0,
        message_id: 0
      },
      update_id: 0
    }
  };
  const query: string = encode("small");
  const result: IVideoInfo = {
    dur: 0,
    fmtList: {
      height: 0,
      itag: 0,
      width: 0
    },
    id: "small",
    itag: 0,
    mime: "video/mp4",
    thumbnailUrl: "",
    title: "",
    url: ""
  };
  const resultCache: IVideo & { id: string; title: string } = {
    duration: 0,
    file_id: "small",
    file_size: 0,
    height: 0,
    id: "small",
    mime_type: "video/mp4",
    thumb: {
      file_id: "small",
      file_size: 0,
      height: 0,
      width: 0
    },
    title: "",
    width: 0
  };
  const resultCacheMimeType: IVideo & { id: string; title: string } = {
    duration: 0,
    file_id: "small",
    file_size: 0,
    height: 0,
    id: "small",
    mime_type: undefined,
    thumb: {
      file_id: "small",
      file_size: 0,
      height: 0,
      width: 0
    },
    title: "",
    width: 0
  };
  const resultCacheThumb: IVideo & { id: string; title: string } = {
    duration: 0,
    file_id: "small",
    file_size: 0,
    height: 0,
    id: "small",
    mime_type: "video/mp4",
    thumb: undefined,
    title: "",
    width: 0
  };
  const resultState: IState = {
    ...initialState,
    message,
    youtubeDownload: {
      query,
      result
    }
  };
  const getChatMemberResult: IChatMember = {
    status: "member",
    user: {
      first_name: "",
      id: 0,
      is_bot: false
    }
  };
  const getChatMemberQuery: IStateGetChatMemberQuery = {
    chat_id: "@melodio",
    user_id: 0
  };
  const sendVideoQuery: IStateSendVideoQuery = {
    caption: caption(),
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: fs.createReadStream(pathThumb("small")),
    video: fs.createReadStream(pathVideo("small")),
    width: 0
  };
  const sendVideoQueryCache: IStateSendVideoQuery = {
    caption: caption(),
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "small",
    video: "small",
    width: 0
  };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency youtubeDownloadObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> =>
          cold("--a", {
            a: actions.getChatMember.result({ result: getChatMemberResult })
          }),
        youtubeDownloadObservable: undefined
      };
      const output$: Observable<
        IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a-b", {
        a: actions.getChatMember.query({
          query: getChatMemberQuery
        }),
        b: actions.youtubeDownload.error({
          error: new Error(
            texts.epicDependencyYoutubeDownloadObservableUndefined
          )
        })
      });
    });
  });

  test("should handle dependency youtubeDownloadObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> =>
          cold("--a", {
            a: actions.getChatMember.result({ result: getChatMemberResult })
          }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--#", {}, error)
      };
      const output$: Observable<
        IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.getChatMember.query({
          query: getChatMemberQuery
        }),
        b: actions.youtubeDownload.error({
          error
        })
      });
    });
  });

  test("should handle error actionYoutubeDownloadQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({})
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> =>
          cold("--a", {
            a: actions.getChatMember.result({ result: getChatMemberResult })
          }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: undefined })
      };
      const output$: Observable<
        IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a-b", {
        a: actions.getChatMember.query({
          query: getChatMemberQuery
        }),
        b: actions.youtubeDownload.error({
          error: new Error(texts.actionYoutubeDownloadQueryUndefined)
        })
      });
    });
  });

  test("should handle error actionYoutubeDownloadResult undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> =>
          cold("--a", {
            a: actions.getChatMember.result({ result: getChatMemberResult })
          }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: undefined })
      };
      const output$: Observable<
        IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.getChatMember.query({
          query: getChatMemberQuery
        }),
        b: actions.youtubeDownload.error({
          error: new Error(texts.actionYoutubeDownloadResultUndefined)
        })
      });
    });
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> =>
          cold("--a", {
            a: actions.getChatMember.result({ result: getChatMemberResult })
          }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.youtubeDownload.error({
          error: new Error(texts.state$Undefined)
        }),
        b: actions.youtubeDownload.error({
          error: new Error(texts.state$Undefined)
        })
      });
    });
  });

  test("should handle error state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> =>
          cold("--a", {
            a: actions.getChatMember.result({ result: getChatMemberResult })
          }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.youtubeDownload.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        }),
        b: actions.youtubeDownload.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      });
    });
  });

  test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> =>
          cold("--a", {
            a: actions.getChatMember.result({ result: getChatMemberResult })
          }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.youtubeDownload.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        }),
        b: actions.youtubeDownload.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        })
      });
    });
  });

  test("should handle result without cache", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> =>
          cold("--a", {
            a: actions.getChatMember.result({ result: getChatMemberResult })
          }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.getChatMember.query({
          query: getChatMemberQuery
        }),
        b: actions.sendVideo.query({
          query: sendVideoQuery
        })
      });
    });
  });

  describe("youtubeDownload epic cache", (): void => {
    let db: Db;
    let connection: MongoClient;

    beforeAll(
      async (): Promise<any> => {
        // @ts-ignore
        connection = await MongoClient.connect(global.__MONGO_URI__, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        // @ts-ignore
        db = connection.db(global.__MONGO_DB_NAME__);
      }
    );

    beforeEach(
      async (): Promise<any> => {
        await db.collection("cache").insertOne(resultCache);
      }
    );

    afterAll(
      async (): Promise<any> => {
        await connection.close();
      }
    );

    afterEach(
      async (): Promise<any> => {
        await db.collection("cache").deleteOne({ id: "small" });
      }
    );

    test("should handle dependency mongoClientObservable undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query
          })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          resultState
        );
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable,
          mongoClientObservable: undefined,
          testAction$: (): ColdObservable<any> =>
            cold("--a", {
              a: actions.getChatMember.result({ result: getChatMemberResult })
            }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a-b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery
          }),
          b: actions.youtubeDownload.error({
            error: new Error(
              texts.epicDependencyMongoClientObservableObservableUndefined
            )
          })
        });
      });
    });

    test("should handle dependency mongoClientObservable error", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query
          })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          resultState
        );
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable,
          mongoClientObservable: (): ColdObservable<any> =>
            cold("--#", {}, error),
          testAction$: (): ColdObservable<any> =>
            cold("--a", {
              a: actions.getChatMember.result({ result: getChatMemberResult })
            }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery
          }),
          b: actions.youtubeDownload.error({
            error
          })
        });
      });
    });

    test("should handle dependency collectionObservable undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query
          })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          resultState
        );
        const dependencies: IDependencies = {
          collectionObservable: undefined,
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> =>
            cold("--a", {
              a: actions.getChatMember.result({ result: getChatMemberResult })
            }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a-b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery
          }),
          b: actions.youtubeDownload.error({
            error: new Error(texts.epicDependencyCollectionObservableUndefined)
          })
        });
      });
    });

    test("should handle dependency collectionObservable error", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query
          })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          resultState
        );
        const dependencies: IDependencies = {
          collectionObservable: (): ColdObservable<any> =>
            cold("--#", {}, error),
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> =>
            cold("--a", {
              a: actions.getChatMember.result({ result: getChatMemberResult })
            }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery
          }),
          b: actions.youtubeDownload.error({
            error
          })
        });
      });
    });

    test("should handle dependency findOneObservable undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query
          })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          resultState
        );
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable: undefined,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> =>
            cold("--a", {
              a: actions.getChatMember.result({ result: getChatMemberResult })
            }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a-b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery
          }),
          b: actions.youtubeDownload.error({
            error: new Error(texts.epicDependencyFindOneObservableUndefined)
          })
        });
      });
    });

    test("should handle dependency findOneObservable error", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query
          })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          resultState
        );
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> =>
            cold("--a", {
              a: actions.getChatMember.result({ result: getChatMemberResult })
            }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery
          }),
          b: actions.youtubeDownload.error({
            error
          })
        });
      });
    });

    test("should handle error value undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        // Const { cold, expectObservable } = runHelpers;
        const { cold } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query
          })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          resultState
        );
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable: (): Observable<any> => cold("-a", { a: null }),
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> =>
            cold("--a", {
              a: actions.getChatMember.result({ result: getChatMemberResult })
            }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
        > = epic.youtubeDownload(action$, state$, dependencies);
        // ExpectObservable(output$).toBe("-a---b", {
        //   A: actions.getChatMember.query({
        //     Query: getChatMemberQuery
        //   }),
        //   B: actions.sendVideo.query({
        //     Query: sendVideoQueryCache
        //   })
        // });
        output$
          .toPromise()
          .then(
            (
              actual:
                | IActionYoutubeDownload
                | IActionGetChatMember
                | IActionSendVideo
            ): void => {
              cold("-a---b", {
                a: actions.getChatMember.query({
                  query: getChatMemberQuery
                }),
                b: actions.sendVideo.query({
                  query: sendVideoQueryCache
                })
              })
                .toPromise()
                .then(
                  (
                    expected:
                      | IActionYoutubeDownload
                      | IActionGetChatMember
                      | IActionSendVideo
                  ): boolean => actual === expected
                );
            }
          );
      });
    });

    test("should handle error mime_type undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        // Const { cold, expectObservable } = runHelpers;
        const { cold } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query
          })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          resultState
        );
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable: (): Observable<any> =>
            cold("-a", {
              a: resultCacheMimeType
            }),
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> =>
            cold("--a", {
              a: actions.getChatMember.result({ result: getChatMemberResult })
            }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
        > = epic.youtubeDownload(action$, state$, dependencies);
        // ExpectObservable(output$).toBe("-a---b", {
        //   A: actions.getChatMember.query({
        //     Query: getChatMemberQuery
        //   }),
        //   B: actions.sendVideo.query({
        //     Query: sendVideoQueryCache
        //   })
        // });
        output$
          .toPromise()
          .then(
            (
              actual:
                | IActionYoutubeDownload
                | IActionGetChatMember
                | IActionSendVideo
            ): void => {
              cold("-a---b", {
                a: actions.getChatMember.query({
                  query: getChatMemberQuery
                }),
                b: actions.sendVideo.query({
                  query: sendVideoQueryCache
                })
              })
                .toPromise()
                .then(
                  (
                    expected:
                      | IActionYoutubeDownload
                      | IActionGetChatMember
                      | IActionSendVideo
                  ): boolean => actual === expected
                );
            }
          );
      });
    });

    test("should handle error thumb undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        // Const { cold, expectObservable } = runHelpers;
        const { cold } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query
          })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          resultState
        );
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable: (): Observable<any> =>
            cold("-a", {
              a: resultCacheThumb
            }),
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> =>
            cold("--a", {
              a: actions.getChatMember.result({ result: getChatMemberResult })
            }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
        > = epic.youtubeDownload(action$, state$, dependencies);
        // ExpectObservable(output$).toBe("-a---b", {
        //   A: actions.getChatMember.query({
        //     Query: getChatMemberQuery
        //   }),
        //   B: actions.sendVideo.query({
        //     Query: sendVideoQueryCache
        //   })
        // });
        output$
          .toPromise()
          .then(
            (
              actual:
                | IActionYoutubeDownload
                | IActionGetChatMember
                | IActionSendVideo
            ): void => {
              cold("-a---b", {
                a: actions.getChatMember.query({
                  query: getChatMemberQuery
                }),
                b: actions.sendVideo.query({
                  query: sendVideoQueryCache
                })
              })
                .toPromise()
                .then(
                  (
                    expected:
                      | IActionYoutubeDownload
                      | IActionGetChatMember
                      | IActionSendVideo
                  ): boolean => actual === expected
                );
            }
          );
      });
    });

    test("should handle result with cache", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        // Const { cold, expectObservable } = runHelpers;
        const { cold } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query
          })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          resultState
        );
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> =>
            cold("--a", {
              a: actions.getChatMember.result({ result: getChatMemberResult })
            }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          IActionYoutubeDownload | IActionGetChatMember | IActionSendVideo
        > = epic.youtubeDownload(action$, state$, dependencies);
        // ExpectObservable(output$).toBe("-a---b", {
        //   A: actions.getChatMember.query({
        //     Query: getChatMemberQuery
        //   }),
        //   B: actions.sendVideo.query({
        //     Query: sendVideoQueryCache
        //   })
        // });
        output$
          .toPromise()
          .then(
            (
              actual:
                | IActionYoutubeDownload
                | IActionGetChatMember
                | IActionSendVideo
            ): void => {
              cold("-a---b", {
                a: actions.getChatMember.query({
                  query: getChatMemberQuery
                }),
                b: actions.sendVideo.query({
                  query: sendVideoQueryCache
                })
              })
                .toPromise()
                .then(
                  (
                    expected:
                      | IActionYoutubeDownload
                      | IActionGetChatMember
                      | IActionSendVideo
                  ): boolean => actual === expected
                );
            }
          );
      });
    });
  });
});
