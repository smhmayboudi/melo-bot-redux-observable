declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import * as fs from "fs";
import * as path from "path";
import { Connection, createConnection } from "mariadb";
import { MongoClient } from "mongodb";
import { StateObservable } from "redux-observable";
import { Observable, of, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IActionYoutubeDownloadResultInsert } from "../../types/iActionYoutubeDownloadResultInsert";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateGetChatMemberQuery } from "../../types/iStateGetChatMemberQuery";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";
import { IStateYoutubeDownloadQuery } from "../../types/iStateYoutubeDownloadQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as actions from "../actions";
import {
  collectionObservable,
  findOneObservable
} from "../libs/mongodbObservable";
import { init as initDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";
import { caption, encode, locale } from "../utils/string";
import * as epic from "./youtubeDownload";

jest.mock("fs");

describe("youtubeDownload epic", (): void => {
  const error: Error = new Error("");
  const query: IStateYoutubeDownloadQuery = {
    id: encode("small", "iCommandYoutubeDownloadOptions")
  };
  const queryGetChatMember: IStateGetChatMemberQuery = {
    chat_id: "@melodio",
    user_id: 0
  };
  const querySendVideo: IStateSendVideoQuery = {
    caption: caption(""),
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: fs.createReadStream(
      path.resolve(__dirname, "../../asset", "small.jpg")
    ),
    video: fs.createReadStream(
      path.resolve(__dirname, "../../asset", "small.mp4")
    ),
    width: 0
  };
  const result: IStateYoutubeDownloadResultInsertQuery | null = {
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
  const resultMimeTypeUndefined: IStateYoutubeDownloadResultInsertQuery | null = {
    ...result,
    mime_type: undefined
  };
  const resultThumbUndefined: IStateYoutubeDownloadResultInsertQuery | null = {
    ...result,
    thumb: undefined
  };
  const resultGetChatMember: IChatMember = {
    status: "member",
    user: {
      first_name: "",
      id: 0,
      is_bot: false
    }
  };
  const state$Value: IState = {
    ...initialState,
    message: {
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
    }
  };
  const state$ValueMessageQueryUndefined: IState = {
    ...state$Value,
    message: {
      ...state$Value.message,
      query: undefined
    }
  };
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...state$Value,
    message: {
      ...state$Value.message,
      query: {
        ...(state$Value.message.query as IStateMessageQuery),
        message: undefined
      }
    }
  };

  let locales: ILocale;
  let mariaClient: Connection;
  let mongoClient: MongoClient;

  afterAll(
    async (): Promise<void> => {
      await mongoClient.close();
    }
  );

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
      mariaClient = await createConnection(env.MARIA_CLIENT_URI);
      mongoClient = await MongoClient.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
  );

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency youtubeDownloadObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: cold("--a", {
          a: {
            ...initialState,
            ...actions.getChatMember.result({ result: resultGetChatMember })
          }
        }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--#", {}, error)
      };
      const output$: Observable<
        | IActionGetChatMember
        | IActionSendMessage
        | IActionSendVideo
        | IActionYoutubeDownload
        | IActionYoutubeDownloadResultFind
        | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.getChatMember.query({ query: queryGetChatMember }),
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
        a: actions.youtubeDownload.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: cold("--a", {
          a: {
            ...initialState,
            ...actions.getChatMember.result({ result: resultGetChatMember })
          }
        }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: undefined })
      };
      const output$: Observable<
        | IActionGetChatMember
        | IActionSendMessage
        | IActionSendVideo
        | IActionYoutubeDownload
        | IActionYoutubeDownloadResultFind
        | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a-b", {
        a: actions.getChatMember.query({ query: queryGetChatMember }),
        b: actions.youtubeDownload.error({
          error: new Error(locales.find("actionYoutubeDownloadQueryUndefined"))
        })
      });
    });
  });

  test("should handle error actionYoutubeDownloadResult undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: cold("--a", {
          a: {
            ...initialState,
            ...actions.getChatMember.result({ result: resultGetChatMember })
          }
        }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: undefined })
      };
      const output$: Observable<
        | IActionGetChatMember
        | IActionSendMessage
        | IActionSendVideo
        | IActionYoutubeDownload
        | IActionYoutubeDownloadResultFind
        | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.getChatMember.query({ query: queryGetChatMember }),
        b: actions.youtubeDownload.error({
          error: new Error(locales.find("actionYoutubeDownloadResultUndefined"))
        })
      });
    });
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: cold("--a", {
          a: {
            ...initialState,
            ...actions.getChatMember.result({ result: resultGetChatMember })
          }
        }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionGetChatMember
        | IActionSendMessage
        | IActionSendVideo
        | IActionYoutubeDownload
        | IActionYoutubeDownloadResultFind
        | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.youtubeDownload.error({
          error: new Error(locales.find("state$Undefined"))
        }),
        b: actions.youtubeDownload.error({
          error: new Error(locales.find("state$Undefined"))
        })
      });
    });
  });

  test("should handle error state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: cold("--a", {
          a: {
            ...initialState,
            ...actions.getChatMember.result({ result: resultGetChatMember })
          }
        }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionGetChatMember
        | IActionSendMessage
        | IActionSendVideo
        | IActionYoutubeDownload
        | IActionYoutubeDownloadResultFind
        | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.youtubeDownload.error({
          error: new Error(locales.find("state$ValueMessageQueryUndefined"))
        }),
        b: actions.youtubeDownload.error({
          error: new Error(locales.find("state$ValueMessageQueryUndefined"))
        })
      });
    });
  });

  test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: cold("--a", {
          a: {
            ...initialState,
            ...actions.getChatMember.result({ result: resultGetChatMember })
          }
        }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionGetChatMember
        | IActionSendMessage
        | IActionSendVideo
        | IActionYoutubeDownload
        | IActionYoutubeDownloadResultFind
        | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.youtubeDownload.error({
          error: new Error(
            locales.find("state$ValueMessageQueryMessageUndefined")
          )
        }),
        b: actions.youtubeDownload.error({
          error: new Error(
            locales.find("state$ValueMessageQueryMessageUndefined")
          )
        })
      });
    });
  });

  test("should handle result without cache", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        ...initDependencies(locales, mariaClient, mongoClient),
        authorization: (): Observable<boolean> => of(true),
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: cold("--a", {
          a: {
            ...initialState,
            ...actions.getChatMember.result({ result: resultGetChatMember })
          }
        }),
        youtubeDownloadObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        | IActionGetChatMember
        | IActionSendMessage
        | IActionSendVideo
        | IActionYoutubeDownload
        | IActionYoutubeDownloadResultFind
        | IActionYoutubeDownloadResultInsert
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.getChatMember.query({ query: queryGetChatMember }),
        b: actions.sendVideo.query({ query: querySendVideo })
      });
    });
  });

  describe("youtubeDownload epic cache", (): void => {
    let db: Db;
    let connection: MongoClient;

    beforeAll(
      async (): Promise<void> => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        db = connection.db(global.__MONGO_DB_NAME__);
      }
    );

    beforeEach(
      async (): Promise<void> => {
        await db.collection("cache").insertOne(result);
      }
    );

    afterAll(
      async (): Promise<void> => {
        await connection.close();
      }
    );

    afterEach(
      async (): Promise<void> => {
        await db.collection("cache").deleteOne({ id: "small" });
      }
    );

    test("should handle dependency mongoClientObservable error", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          collectionObservable,
          findOneObservable,
          mongoClientObservable: (): ColdObservable<any> =>
            cold("--#", {}, error),
          testAction$: cold("--a", {
            a: {
              ...initialState,
              ...actions.getChatMember.result({ result: resultGetChatMember })
            }
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          | IActionGetChatMember
          | IActionSendMessage
          | IActionSendVideo
          | IActionYoutubeDownload
          | IActionYoutubeDownloadResultFind
          | IActionYoutubeDownloadResultInsert
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({ query: queryGetChatMember }),
          b: actions.youtubeDownload.error({
            error
          })
        });
      });
    });

    test("should handle dependency collectionObservable error", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          collectionObservable: (): ColdObservable<any> =>
            cold("--#", {}, error),
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(mongoClient),
          testAction$: cold("--a", {
            a: {
              ...initialState,
              ...actions.getChatMember.result({ result: resultGetChatMember })
            }
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          | IActionGetChatMember
          | IActionSendMessage
          | IActionSendVideo
          | IActionYoutubeDownload
          | IActionYoutubeDownloadResultFind
          | IActionYoutubeDownloadResultInsert
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({ query: queryGetChatMember }),
          b: actions.youtubeDownload.error({
            error
          })
        });
      });
    });

    test("should handle dependency findOneObservable error", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          collectionObservable,
          findOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
          mongoClientObservable: (): Observable<MongoClient> => of(mongoClient),
          testAction$: cold("--a", {
            a: {
              ...initialState,
              ...actions.getChatMember.result({ result: resultGetChatMember })
            }
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          | IActionGetChatMember
          | IActionSendMessage
          | IActionSendVideo
          | IActionYoutubeDownload
          | IActionYoutubeDownloadResultFind
          | IActionYoutubeDownloadResultInsert
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({ query: queryGetChatMember }),
          b: actions.youtubeDownload.error({
            error
          })
        });
      });
    });

    test("should handle error value undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          collectionObservable,
          findOneObservable: (): Observable<any> => cold("-a", { a: null }),
          mongoClientObservable: (): Observable<MongoClient> => of(mongoClient),
          testAction$: cold("--a", {
            a: {
              ...initialState,
              ...actions.getChatMember.result({ result: resultGetChatMember })
            }
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          | IActionGetChatMember
          | IActionSendMessage
          | IActionSendVideo
          | IActionYoutubeDownload
          | IActionYoutubeDownloadResultFind
          | IActionYoutubeDownloadResultInsert
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({ query: queryGetChatMember }),
          b: actions.sendVideo.query({ query: querySendVideo })
        });
      });
    });

    test("should handle error mime_type undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          collectionObservable,
          findOneObservable: (): Observable<any> =>
            cold("-a", {
              a: resultMimeTypeUndefined
            }),
          mongoClientObservable: (): Observable<MongoClient> => of(mongoClient),
          testAction$: cold("--a", {
            a: {
              ...initialState,
              ...actions.getChatMember.result({ result: resultGetChatMember })
            }
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          | IActionGetChatMember
          | IActionSendMessage
          | IActionSendVideo
          | IActionYoutubeDownload
          | IActionYoutubeDownloadResultFind
          | IActionYoutubeDownloadResultInsert
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({ query: queryGetChatMember }),
          b: actions.sendVideo.query({ query: querySendVideo })
        });
      });
    });

    test("should handle error thumb undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          collectionObservable,
          findOneObservable: (): Observable<any> =>
            cold("-a", {
              a: resultThumbUndefined
            }),
          mongoClientObservable: (): Observable<MongoClient> => of(mongoClient),
          testAction$: cold("--a", {
            a: {
              ...initialState,
              ...actions.getChatMember.result({ result: resultGetChatMember })
            }
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          | IActionGetChatMember
          | IActionSendMessage
          | IActionSendVideo
          | IActionYoutubeDownload
          | IActionYoutubeDownloadResultFind
          | IActionYoutubeDownloadResultInsert
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({ query: queryGetChatMember }),
          b: actions.sendVideo.query({ query: querySendVideo })
        });
      });
    });

    test("should handle result with cache", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          collectionObservable,
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(mongoClient),
          testAction$: cold("--a", {
            a: {
              ...initialState,
              ...actions.getChatMember.result({ result: resultGetChatMember })
            }
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-")
        };
        const output$: Observable<
          | IActionGetChatMember
          | IActionSendMessage
          | IActionSendVideo
          | IActionYoutubeDownload
          | IActionYoutubeDownloadResultFind
          | IActionYoutubeDownloadResultInsert
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({ query: queryGetChatMember }),
          b: actions.sendVideo.query({ query: querySendVideo })
        });
      });
    });
  });
});
