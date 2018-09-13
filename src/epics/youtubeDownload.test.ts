import * as fs from "fs";
import { MongoClient } from "mongodb";
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
import * as actions from "../actions";
import * as texts from "../config/texts";
import {
  collectionObservable,
  findOneObservable,
} from "../lib/mongodbObservable";
import { caption, encode, pathThumb, pathVideo } from "../utils/string";
import * as epic from "./youtubeDownload";

jest.mock("fs");

describe("youtubeDownload epic", (): void => {

  const error: Error = new Error("");
  const initalState: IState = {
    getChatMember: actions.getChatMember.initalState,
    literate: actions.literate.initalState,
    message: actions.message.initalState,
    sendAudio: actions.sendAudio.initalState,
    sendMessage: actions.sendMessage.initalState,
    sendVideo: actions.sendVideo.initalState,
    youtubeDownload: actions.youtubeDownload.initalState,
    youtubeSearchList: actions.youtubeSearchList.initalState,
    youtubeVideoList: actions.youtubeVideoList.initalState,
  };
  const state$ValueMessageQueryUndefined: IState = {
    ...initalState,
    message: {
      query: undefined,
    },
    youtubeDownload: {
      query: undefined,
      result: undefined,
    },
  };
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...initalState,
    message: {
      query: {
        message: undefined,
        update_id: 0,
      },
    },
    youtubeDownload: {
      query: undefined,
      result: undefined,
    },
  };
  const message: IStateMessage = {
    query: {
      message: {
        chat: {
          id: 0,
          type: "",
        },
        date: 0,
        message_id: 0,
      },
      update_id: 0,
    },
  };
  const query: string = encode("small");
  const result: IVideoInfo = {
    dur: 0,
    fmtList: {
      height: 0,
      itag: 0,
      width: 0,
    },
    id: "small",
    itag: 0,
    mime: "video/mp4",
    thumbnailUrl: "",
    title: "",
    url: "",
  };
  const resultState: IState = {
    ...initalState,
    message,
    youtubeDownload: {
      query,
      result,
    },
  };
  const getChatMemberResult: IChatMember = {
    status: "member",
    user: {
      first_name: "",
      id: 0,
      is_bot: false,
    },
  };
  const getChatMemberQuery: IStateGetChatMemberQuery = {
    chat_id: "@melodio",
    user_id: 0,
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
    width: 0,
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
    width: 0,
  };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler(
      (actual: IState, expected: IState):
        boolean | void => {
        expect(actual)
          .toEqual(expected);
      },
    );
  });

  test("should handle dependency youtubeDownloadObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> => cold("--a", {
          a: actions.getChatMember.result({
            result: getChatMemberResult,
          }),
        }),
        youtubeDownloadObservable: undefined,
      };
      const output$: Observable<IActionGetChatMember | IActionSendVideo> =
        epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a-b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery,
          }),
          b: actions.sendVideo.error({
            error: new Error(texts.epicDependencyYoutubeDownloadObservableUndefined),
          }),
        });
    });
  });

  test("should handle dependency youtubeDownloadObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> => cold("--a", {
          a: actions.getChatMember.result({
            result: getChatMemberResult,
          }),
        }),
        youtubeDownloadObservable: (): ColdObservable<any> => cold("--#", {}, error),
      };
      const output$: Observable<IActionGetChatMember | IActionSendVideo> =
        epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a---b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery,
          }),
          b: actions.sendVideo.error({
            error,
          }),
        });
    });
  });

  test("should handle error actionYoutubeDownloadQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({}),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> => cold("--a", {
          a: actions.getChatMember.result({
            result: getChatMemberResult,
          }),
        }),
        youtubeDownloadObservable: (): ColdObservable<any> => cold("--a", {
          a: undefined,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendVideo> =
        epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a-b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery,
          }),
          b: actions.sendVideo.error({
            error: new Error(texts.actionYoutubeDownloadQueryUndefined),
          }),
        });
    });
  });

  test("should handle error actionYoutubeDownloadResult undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> => cold("--a", {
          a: actions.getChatMember.result({
            result: getChatMemberResult,
          }),
        }),
        youtubeDownloadObservable: (): ColdObservable<any> => cold("--a", {
          a: undefined,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendVideo> =
        epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a---b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery,
          }),
          b: actions.sendVideo.error({
            error: new Error(texts.actionYoutubeDownloadResultUndefined),
          }),
        });
    });
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> => cold("--a", {
          a: actions.getChatMember.result({
            result: getChatMemberResult,
          }),
        }),
        youtubeDownloadObservable: (): ColdObservable<any> => cold("--a", {
          a: result,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendVideo> =
        epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a---b", {
          a: actions.getChatMember.error({
            error: new Error(texts.state$Undefined),
          }),
          b: actions.sendVideo.error({
            error: new Error(texts.state$Undefined),
          }),
        });
    });
  });

  test("should handle error state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), state$ValueMessageQueryUndefined);
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> => cold("--a", {
          a: actions.getChatMember.result({
            result: getChatMemberResult,
          }),
        }),
        youtubeDownloadObservable: (): ColdObservable<any> => cold("--a", {
          a: result,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendVideo> =
        epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a---b", {
          a: actions.getChatMember.error({
            error: new Error(texts.state$ValueMessageQueryUndefined),
          }),
          b: actions.sendVideo.error({
            error: new Error(texts.state$ValueMessageQueryUndefined),
          }),
        });
    });
  });

  test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), state$ValueMessageQueryMessageUndefined);
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> => cold("--a", {
          a: actions.getChatMember.result({
            result: getChatMemberResult,
          }),
        }),
        youtubeDownloadObservable: (): ColdObservable<any> => cold("--a", {
          a: result,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendVideo> =
        epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a---b", {
          a: actions.getChatMember.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined),
          }),
          b: actions.sendVideo.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined),
          }),
        });
    });
  });

  test("should handle result without cache", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
        a: actions.youtubeDownload.query({
          query,
        }),
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {
        collectionObservable: (): Observable<any> => cold("-"),
        findOneObservable: (): Observable<any> => cold("-"),
        mongoClientObservable: (): Observable<any> => cold("-"),
        testAction$: (): ColdObservable<any> => cold("--a", {
          a: actions.getChatMember.result({
            result: getChatMemberResult,
          }),
        }),
        youtubeDownloadObservable: (): ColdObservable<any> => cold("--a", {
          a: result,
        }),
      };
      const output$: Observable<IActionGetChatMember | IActionSendVideo> =
        epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a---b", {
          a: actions.getChatMember.query({
            query: getChatMemberQuery,
          }),
          b: actions.sendVideo.query({
            query: sendVideoQuery,
          }),
        });
    });
  });

  describe("youtubeDownload epic cache", (): void => {

    let connection: MongoClient;

    beforeAll(async (): Promise<any> => {
      // @ts-ignore
      connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    });

    beforeEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .insertOne({
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
            width: 0,
          },
          title: "",
          width: 0,
        });
    });

    afterAll(async (): Promise<any> => {
      await connection.close();
    });

    afterEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .deleteOne({ id: "small" });
    });

    test("should handle dependency mongoClientObservable undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query,
          }),
        });
        const state$: StateObservable<IState> | undefined =
          new StateObservable(new Subject(), resultState);
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable,
          mongoClientObservable: undefined,
          testAction$: (): ColdObservable<any> => cold("--a", {
            a: actions.getChatMember.result({
              result: getChatMemberResult,
            }),
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-"),
        };
        const output$: Observable<IActionGetChatMember | IActionSendVideo> =
          epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$)
          .toBe("-a---b", {
            a: actions.getChatMember.query({
              query: getChatMemberQuery,
            }),
            b: actions.sendVideo.query({
              query: sendVideoQueryCache,
            }),
          });
      });
    });

  });

  describe("youtubeDownload epic cache", (): void => {

    let connection: MongoClient;

    beforeAll(async (): Promise<any> => {
      // @ts-ignore
      connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    });

    beforeEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .insertOne({
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
            width: 0,
          },
          title: "",
          width: 0,
        });
    });

    afterAll(async (): Promise<any> => {
      await connection.close();
    });

    afterEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .deleteOne({ id: "small" });
    });

    test("should handle dependency mongoClientObservable error", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query,
          }),
        });
        const state$: StateObservable<IState> | undefined =
          new StateObservable(new Subject(), resultState);
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable,
          mongoClientObservable: (): ColdObservable<any> => cold("--#", {}, error),
          testAction$: (): ColdObservable<any> => cold("--a", {
            a: actions.getChatMember.result({
              result: getChatMemberResult,
            }),
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-"),
        };
        const output$: Observable<IActionGetChatMember | IActionSendVideo> =
          epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$)
          .toBe("-a---b", {
            a: actions.getChatMember.query({
              query: getChatMemberQuery,
            }),
            b: actions.sendVideo.query({
              query: sendVideoQueryCache,
            }),
          });
      });
    });

  });

  describe("youtubeDownload epic cache", (): void => {

    let connection: MongoClient;

    beforeAll(async (): Promise<any> => {
      // @ts-ignore
      connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    });

    beforeEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .insertOne({
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
            width: 0,
          },
          title: "",
          width: 0,
        });
    });

    afterAll(async (): Promise<any> => {
      await connection.close();
    });

    afterEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .deleteOne({ id: "small" });
    });

    test("should handle dependency collectionObservable undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query,
          }),
        });
        const state$: StateObservable<IState> | undefined =
          new StateObservable(new Subject(), resultState);
        const dependencies: IDependencies = {
          collectionObservable: undefined,
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> => cold("--a", {
            a: actions.getChatMember.result({
              result: getChatMemberResult,
            }),
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-"),
        };
        const output$: Observable<IActionGetChatMember | IActionSendVideo> =
          epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$)
          .toBe("-a---b", {
            a: actions.getChatMember.query({
              query: getChatMemberQuery,
            }),
            b: actions.sendVideo.query({
              query: sendVideoQueryCache,
            }),
          });
      });
    });

  });

  describe("youtubeDownload epic cache", (): void => {

    let connection: MongoClient;

    beforeAll(async (): Promise<any> => {
      // @ts-ignore
      connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    });

    beforeEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .insertOne({
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
            width: 0,
          },
          title: "",
          width: 0,
        });
    });

    afterAll(async (): Promise<any> => {
      await connection.close();
    });

    afterEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .deleteOne({ id: "small" });
    });

    test("should handle dependency collectionObservable error", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query,
          }),
        });
        const state$: StateObservable<IState> | undefined =
          new StateObservable(new Subject(), resultState);
        const dependencies: IDependencies = {
          collectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> => cold("--a", {
            a: actions.getChatMember.result({
              result: getChatMemberResult,
            }),
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-"),
        };
        const output$: Observable<IActionGetChatMember | IActionSendVideo> =
          epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$)
          .toBe("-a---b", {
            a: actions.getChatMember.query({
              query: getChatMemberQuery,
            }),
            b: actions.sendVideo.query({
              query: sendVideoQueryCache,
            }),
          });
      });
    });

  });

  describe("youtubeDownload epic cache", (): void => {

    let connection: MongoClient;

    beforeAll(async (): Promise<any> => {
      // @ts-ignore
      connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    });

    beforeEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .insertOne({
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
            width: 0,
          },
          title: "",
          width: 0,
        });
    });

    afterAll(async (): Promise<any> => {
      await connection.close();
    });

    afterEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .deleteOne({ id: "small" });
    });

    test("should handle dependency findOneObservable undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query,
          }),
        });
        const state$: StateObservable<IState> | undefined =
          new StateObservable(new Subject(), resultState);
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable: undefined,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> => cold("--a", {
            a: actions.getChatMember.result({
              result: getChatMemberResult,
            }),
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-"),
        };
        const output$: Observable<IActionGetChatMember | IActionSendVideo> =
          epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$)
          .toBe("-a---b", {
            a: actions.getChatMember.query({
              query: getChatMemberQuery,
            }),
            b: actions.sendVideo.query({
              query: sendVideoQueryCache,
            }),
          });
      });
    });

  });

  describe("youtubeDownload epic cache", (): void => {

    let connection: MongoClient;

    beforeAll(async (): Promise<any> => {
      // @ts-ignore
      connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    });

    beforeEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .insertOne({
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
            width: 0,
          },
          title: "",
          width: 0,
        });
    });

    afterAll(async (): Promise<any> => {
      await connection.close();
    });

    afterEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .deleteOne({ id: "small" });
    });

    test("should handle dependency findOneObservable error", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query,
          }),
        });
        const state$: StateObservable<IState> | undefined =
          new StateObservable(new Subject(), resultState);
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> => cold("--a", {
            a: actions.getChatMember.result({
              result: getChatMemberResult,
            }),
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-"),
        };
        const output$: Observable<IActionGetChatMember | IActionSendVideo> =
          epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$)
          .toBe("-a---b", {
            a: actions.getChatMember.query({
              query: getChatMemberQuery,
            }),
            b: actions.sendVideo.query({
              query: sendVideoQueryCache,
            }),
          });
      });
    });

  });

  describe("youtubeDownload epic cache", (): void => {

    let connection: MongoClient;

    beforeAll(async (): Promise<any> => {
      // @ts-ignore
      connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    });

    afterAll(async (): Promise<any> => {
      await connection.close();
    });

    afterEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .deleteOne({ id: "small" });
    });

    test("should handle error value undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query,
          }),
        });
        const state$: StateObservable<IState> | undefined =
          new StateObservable(new Subject(), resultState);
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> => cold("--a", {
            a: actions.getChatMember.result({
              result: getChatMemberResult,
            }),
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-"),
        };
        const output$: Observable<IActionGetChatMember | IActionSendVideo> =
          epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$)
          .toBe("-a---b", {
            a: actions.getChatMember.query({
              query: getChatMemberQuery,
            }),
            b: actions.sendVideo.query({
              query: sendVideoQueryCache,
            }),
          });
      });
    });

  });

  describe("youtubeDownload epic cache", (): void => {

    let connection: MongoClient;

    beforeAll(async (): Promise<any> => {
      // @ts-ignore
      connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    });

    beforeEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .insertOne({
          duration: 0,
          file_id: "small",
          file_size: 0,
          height: 0,
          id: "small",
          thumb: {
            file_id: "small",
            file_size: 0,
            height: 0,
            width: 0,
          },
          title: "",
          width: 0,
        });
    });

    afterAll(async (): Promise<any> => {
      await connection.close();
    });

    afterEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .deleteOne({ id: "small" });
    });

    test("should handle error mime_type undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query,
          }),
        });
        const state$: StateObservable<IState> | undefined =
          new StateObservable(new Subject(), resultState);
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> => cold("--a", {
            a: actions.getChatMember.result({
              result: getChatMemberResult,
            }),
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-"),
        };
        const output$: Observable<IActionGetChatMember | IActionSendVideo> =
          epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$)
          .toBe("-a---b", {
            a: actions.getChatMember.query({
              query: getChatMemberQuery,
            }),
            b: actions.sendVideo.query({
              query: sendVideoQueryCache,
            }),
          });
      });
    });

  });

  describe("youtubeDownload epic cache", (): void => {

    let connection: MongoClient;

    beforeAll(async (): Promise<any> => {
      // @ts-ignore
      connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    });

    beforeEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .insertOne({
          duration: 0,
          file_id: "small",
          file_size: 0,
          height: 0,
          id: "small",
          mime_type: "video/mp4",
          title: "",
          width: 0,
        });
    });

    afterAll(async (): Promise<any> => {
      await connection.close();
    });

    afterEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .deleteOne({ id: "small" });
    });

    test("should handle error thumb undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query,
          }),
        });
        const state$: StateObservable<IState> | undefined =
          new StateObservable(new Subject(), resultState);
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> => cold("--a", {
            a: actions.getChatMember.result({
              result: getChatMemberResult,
            }),
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-"),
        };
        const output$: Observable<IActionGetChatMember | IActionSendVideo> =
          epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$)
          .toBe("-a---b", {
            a: actions.getChatMember.query({
              query: getChatMemberQuery,
            }),
            b: actions.sendVideo.query({
              query: sendVideoQueryCache,
            }),
          });
      });
    });

  });

  describe("youtubeDownload epic cache", (): void => {

    let connection: MongoClient;

    beforeAll(async (): Promise<any> => {
      // @ts-ignore
      connection = await MongoClient.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    });

    beforeEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .insertOne({
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
            width: 0,
          },
          title: "",
          width: 0,
        });
    });

    afterAll(async (): Promise<any> => {
      await connection.close();
    });

    afterEach(async (): Promise<any> => {
      await connection
        // @ts-ignore
        .db(global.__MONGO_DB_NAME__)
        .collection("cache")
        .deleteOne({ id: "small" });
    });

    test("should handle result with cache", (): void => {
      testScheduler.run((runHelpers: RunHelpers) => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionYoutubeDownload> = cold("-a", {
          a: actions.youtubeDownload.query({
            query,
          }),
        });
        const state$: StateObservable<IState> | undefined =
          new StateObservable(new Subject(), resultState);
        const dependencies: IDependencies = {
          collectionObservable,
          findOneObservable,
          mongoClientObservable: (): Observable<MongoClient> => of(connection),
          testAction$: (): ColdObservable<any> => cold("--a", {
            a: actions.getChatMember.result({
              result: getChatMemberResult,
            }),
          }),
          youtubeDownloadObservable: (): ColdObservable<any> => cold("-"),
        };
        const output$: Observable<IActionGetChatMember | IActionSendVideo> =
          epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$)
          .toBe("-a---b", {
            a: actions.getChatMember.query({
              query: getChatMemberQuery,
            }),
            b: actions.sendVideo.query({
              query: sendVideoQueryCache,
            }),
          });
      });
    });

  });

});
