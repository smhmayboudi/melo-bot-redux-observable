declare global {
  namespace NodeJS {
    // tslint:disable-next-line: interface-name
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import { Db, MongoClient } from "mongodb";
import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import {
  collectionObservable,
  findOneObservable,
  insertOneObservable
} from "../libs/mongodbObservable";
import { encode } from "../utils/string";

import * as epic from "./sendVideo";

describe("sendVideo epic", (): void => {
  const error: Error = new Error("");
  const query: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const result: IMessage = {
    caption: "",
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0,
    reply_to_message: {
      chat: {
        id: 0,
        type: "private"
      },
      date: 0,
      message_id: 0,
      text: `/${texts.commandDownload}${texts.commandSeparator}${encode(
        "small"
      )}`
    }
  };
  const resultCaption: IMessage = {
    ...result,
    caption: undefined
  };
  const resultReplyToMessageText: IMessage = {
    ...result,
    reply_to_message: {
      ...(result.reply_to_message as IMessage),
      text: undefined
    }
  };
  const resultReplyToMessage: IMessage = {
    ...result,
    reply_to_message: undefined
  };
  const responseOKF: IResponse = {
    description: "Bad Request: CHAT_ADMIN_REQUIRED",
    error_code: 400,
    ok: false
  };
  const responseOKT: IResponse = {
    ok: true,
    result
  };
  const responseOKTUndefined: IResponse = {
    ...responseOKT,
    result: undefined
  };
  const responseOKTCaption: IResponse = {
    ...responseOKT,
    result: resultCaption
  };
  const responseOKTReplyToMessage: IResponse = {
    ...responseOKT,
    result: resultReplyToMessage
  };
  const responseOKTReplyToMessageText: IResponse = {
    ...responseOKT,
    result: resultReplyToMessageText
  };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  let db: Db;
  let connection: MongoClient;

  beforeAll(
    async (): Promise<any> => {
      connection = await MongoClient.connect(global.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      db = connection.db(global.__MONGO_DB_NAME__);
    }
  );

  beforeEach(
    async (): Promise<any> => {
      await db.collection("cache").deleteOne({ id: "small" });
    }
  );

  afterAll(
    async (): Promise<any> => {
      await connection.close();
    }
  );

  test("should handle dependency botToken undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.sendVideo.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsUploadObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: undefined
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.sendVideo.error({
          error: new Error(
            texts.epicDependencyRequestsUploadObservableUndefined
          )
        })
      });
    });
  });

  test("should handle dependency requestsUploadObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--#", {}, error)
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideo.error({ error })
      });
    });
  });

  test("should handle error actionSendVideoQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({})
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-a", {
        a: actions.sendVideo.error({
          error: new Error(texts.actionSendVideoQueryUndefined)
        })
      });
    });
  });

  test("should handle dependency mongoClientObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: undefined,
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---(ab)", {
        a: actions.sendVideo.error({
          error: new Error(
            texts.epicDependencyMongoClientObservableObservableUndefined
          )
        }),
        b: actions.sendVideo.result({ result })
      });
    });
  });

  test("should handle dependency mongoClientObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): ColdObservable<any> =>
          cold("--#", {}, error),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-----(ab)", {
        a: actions.sendVideo.error({ error }),
        b: actions.sendVideo.result({ result })
      });
    });
  });

  test("should handle dependency collectionObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable: undefined,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---(ab)", {
        a: actions.sendVideo.error({
          error: new Error(texts.epicDependencyCollectionObservableUndefined)
        }),
        b: actions.sendVideo.result({ result })
      });
    });
  });

  test("should handle dependency collectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-----(ab)", {
        a: actions.sendVideo.error({ error }),
        b: actions.sendVideo.result({ result })
      });
    });
  });

  test("should handle dependency findOneObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable: undefined,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---(ab)", {
        a: actions.sendVideo.error({
          error: new Error(texts.epicDependencyFindOneObservableUndefined)
        }),
        b: actions.sendVideo.result({ result })
      });
    });
  });

  test("should handle dependency findOneObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-----(ab)", {
        a: actions.sendVideo.error({ error }),
        b: actions.sendVideo.result({ result })
      });
    });
  });

  test("should handle dependency insertOneObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable: undefined,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      // ExpectObservable(output$).toBe("---a", {
      //   A: actions.sendVideo.error({
      //     Error: new Error(texts.epicDependencyInsertOneObservableUndefined)
      //   })
      // });
      output$.toPromise().then((actual: IActionSendVideo): void => {
        cold("---a", {
          a: actions.sendVideo.error({
            error: new Error(texts.epicDependencyInsertOneObservableUndefined)
          })
        })
          .toPromise()
          .then((expected: IActionSendVideo): boolean => actual === expected);
      });
    });
  });

  test("should handle dependency insertOneObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      // ExpectObservable(output$).toBe("---a", {
      //   A: actions.sendVideo.error({
      //     Error
      //   })
      // });
      output$.toPromise().then((actual: IActionSendVideo): void => {
        cold("---a", {
          a: actions.sendVideo.error({
            error
          })
        })
          .toPromise()
          .then((expected: IActionSendVideo): boolean => actual === expected);
      });
    });
  });

  test("should handle error actionSendVideoResult undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKTUndefined })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      // ExpectObservable(output$).toBe("---a", {
      //   A: actions.sendVideo.error({
      //     Error: new Error(texts.actionSendVideoResultUndefined)
      //   })
      // });
      output$.toPromise().then((actual: IActionSendVideo): void => {
        cold("---a", {
          a: actions.sendVideo.error({
            error: new Error(texts.actionSendVideoResultUndefined)
          })
        })
          .toPromise()
          .then((expected: IActionSendVideo): boolean => actual === expected);
      });
    });
  });

  test("should handle error actionSendVideoResultReplyToMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKTReplyToMessage })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---(ab)", {
        a: actions.sendVideo.error({
          error: new Error(texts.actionSendVideoResultReplyToMessageUndefined)
        }),
        b: actions.sendVideo.result({ result: resultReplyToMessage })
      });
    });
  });

  test("should handle error actionSendVideoResultReplyToMessageText undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKTReplyToMessageText })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---(ab)", {
        a: actions.sendVideo.error({
          error: new Error(
            texts.actionSendVideoResultReplyToMessageTextUndefined
          )
        }),
        b: actions.sendVideo.result({ result: resultReplyToMessageText })
      });
    });
  });

  test("should handle error actionSendVideoResultCaption undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKTCaption })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      // ExpectObservable(output$).toBe("---a", {
      //   A: actions.sendVideo.error({
      //     Error: new Error(texts.actionSendVideoResultCaptionUndefined)
      //   })
      // });
      output$.toPromise().then((actual: IActionSendVideo): void => {
        cold("---a", {
          a: actions.sendVideo.error({
            error: new Error(texts.actionSendVideoResultCaptionUndefined)
          })
        })
          .toPromise()
          .then((expected: IActionSendVideo): boolean => actual === expected);
      });
    });
  });

  test("should handle result ok false", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKF })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideo.error({
          error: responseOKF
        })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: responseOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      // ExpectObservable(output$).toBe("---a", {
      //   A: actions.sendVideo.result({
      //     Result
      //   })
      // });
      output$.toPromise().then((actual: IActionSendVideo): void => {
        cold("---a", {
          a: actions.sendVideo.result({
            result
          })
        })
          .toPromise()
          .then((expected: IActionSendVideo): boolean => actual === expected);
      });
    });
  });
});
