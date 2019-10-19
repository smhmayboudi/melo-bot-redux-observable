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
import * as texts from "../config/texts";
import {
  collectionObservable,
  findOneObservable,
  insertOneObservable
} from "../lib/mongodbObservable";
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
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const queryNoCaption: IStateSendVideoQuery = {
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const queryNoDisableNotification: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const queryNoDuration: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    height: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const queryNoParseMode: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const queryNoHeight: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const queryNoReplyMarkup: IStateSendVideoQuery = {
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
  const queryNoReplyToMessageId: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    supports_streaming: true,
    thumb: "",
    video: "",
    width: 0
  };
  const queryNoSupportsStreaming: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    thumb: "",
    video: "",
    width: 0
  };
  const queryNoThumb: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    supports_streaming: true,
    video: "",
    width: 0
  };
  const queryNoWidth: IStateSendVideoQuery = {
    caption: "",
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_markup: { remove_keyboard: true },
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: "",
    video: ""
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
    caption: undefined,
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
  const resultReplyToMessageText: IMessage = {
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
      text: undefined
    }
  };
  const resultReplyToMessage: IMessage = {
    caption: "",
    chat: {
      id: 0,
      type: "private"
    },
    date: 0,
    message_id: 0,
    reply_to_message: undefined
  };
  const resultOKF: IResponse = {
    description: "Bad Request: CHAT_ADMIN_REQUIRED",
    error_code: 400,
    ok: false
  };
  const resultOKT: IResponse = {
    ok: true,
    result
  };
  // Const resultOKTUndefined: IResponse = {
  //   Ok: true,
  //   Result: undefined
  // };
  const resultOKTCaption: IResponse = {
    ok: true,
    result: resultCaption
  };
  const resultOKTReplyToMessage: IResponse = {
    ok: true,
    result: resultReplyToMessage
  };
  const resultOKTReplyToMessageText: IResponse = {
    ok: true,
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
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: undefined,
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
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsUploadObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
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
        a: actions.sendVideo.query({
          query
        })
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
        a: actions.sendVideo.error({
          error
        })
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
          cold("--a", { a: resultOKT })
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
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: undefined,
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideo.error({
          error: new Error(
            texts.epicDependencyMongoClientObservableObservableUndefined
          )
        })
      });
    });
  });

  test("should handle dependency mongoClientObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
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
          cold("--a", { a: resultOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-----a", {
        a: actions.sendVideo.error({
          error
        })
      });
    });
  });

  test("should handle dependency collectionObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable: undefined,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideo.error({
          error: new Error(texts.epicDependencyCollectionObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency collectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-----a", {
        a: actions.sendVideo.error({
          error
        })
      });
    });
  });

  test("should handle dependency findOneObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable: undefined,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideo.error({
          error: new Error(texts.epicDependencyFindOneObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency findOneObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("-----a", {
        a: actions.sendVideo.error({
          error
        })
      });
    });
  });

  test("should handle dependency insertOneObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable: undefined,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  // Test("should handle error actionSendVideoResult undefined", (): void => {
  //   TestScheduler.run((runHelpers: RunHelpers): void => {
  //     Const { cold, expectObservable } = runHelpers;
  //     Const action$: ColdObservable<IActionSendVideo> = cold("-a", {
  //       A: actions.sendVideo.query({
  //         Query
  //       })
  //     });
  //     Const state$: StateObservable<IState> | undefined = undefined;
  //     Const dependencies: IDependencies = {
  //       BotToken: "",
  //       CollectionObservable,
  //       FindOneObservable,
  //       InsertOneObservable,
  //       MongoClientObservable: (): Observable<MongoClient> => of(connection),
  //       RequestsUploadObservable: (): ColdObservable<any> =>
  //         Cold("--a", { a: resultOKTUndefined })
  //     };
  //     Const output$: Observable<IActionSendVideo> = epic.sendVideo(
  //       Action$,
  //       State$,
  //       Dependencies
  //     );
  //     ExpectObservable(output$).toBe("---a", {
  //       A: actions.sendVideo.error({
  //         Error: new Error(texts.actionSendVideoResultUndefined)
  //       })
  //     });
  //   });
  // });

  test("should handle error actionSendVideoResultReplyToMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKTReplyToMessage })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideo.error({
          error: new Error(texts.actionSendVideoResultReplyToMessageUndefined)
        })
      });
    });
  });

  test("should handle error actionSendVideoResultReplyToMessageText undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKTReplyToMessageText })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideo.error({
          error: new Error(
            texts.actionSendVideoResultReplyToMessageTextUndefined
          )
        })
      });
    });
  });

  test("should handle error actionSendVideoResultCaption undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKTCaption })
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
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKF })
      };
      const output$: Observable<IActionSendVideo> = epic.sendVideo(
        action$,
        state$,
        dependencies
      );
      expectObservable(output$).toBe("---a", {
        a: actions.sendVideo.error({
          error: resultOKF
        })
      });
    });
  });

  test("should handle result ok true", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  test("should handle result ok true no caption", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query: queryNoCaption
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  test("should handle result ok true no disable_notification", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query: queryNoDisableNotification
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  test("should handle result ok true no duration", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query: queryNoDuration
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  test("should handle result ok true no parse_mode", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query: queryNoParseMode
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  test("should handle result ok true no heigh", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query: queryNoHeight
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  test("should handle result ok true no reply_markup", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query: queryNoReplyMarkup
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  test("should handle result ok true no reply_to_message_id", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query: queryNoReplyToMessageId
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  test("should handle result ok true no supports_streaming", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query: queryNoSupportsStreaming
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  test("should handle result ok true no thumb", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query: queryNoThumb
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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

  test("should handle result ok true no width", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      // Const { cold, expectObservable } = runHelpers;
      const { cold } = runHelpers;
      const action$: ColdObservable<IActionSendVideo> = cold("-a", {
        a: actions.sendVideo.query({
          query: queryNoWidth
        })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        botToken: "",
        collectionObservable,
        findOneObservable,
        insertOneObservable,
        mongoClientObservable: (): Observable<MongoClient> => of(connection),
        requestsUploadObservable: (): ColdObservable<any> =>
          cold("--a", { a: resultOKT })
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
