declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

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
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import { IVideo } from "../../types/telegramBot/types/iVideo";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import {
  collectionObservable,
  findOneObservable
} from "../libs/mongodbObservable";
import { caption, encode, pathThumb, pathVideo } from "../utils/string";

import * as epic from "./youtubeDownload";

jest.mock("fs");

describe("youtubeDownload epic", (): void => {
  const initialState: IState = {
    addStickerToSet: actions.addStickerToSet.initialState,
    answerCallbackQuery: actions.answerCallbackQuery.initialState,
    answerInlineQuery: actions.answerInlineQuery.initialState,
    answerPreCheckoutQuery: actions.answerPreCheckoutQuery.initialState,
    answerShippingQuery: actions.answerShippingQuery.initialState,
    chosenInlineResult: actions.chosenInlineResult.initialState,
    createNewStickerSet: actions.createNewStickerSet.initialState,
    deleteChatPhoto: actions.deleteChatPhoto.initialState,
    deleteChatStickerSet: actions.deleteChatStickerSet.initialState,
    deleteMessage: actions.deleteMessage.initialState,
    deleteStickerFromSet: actions.deleteStickerFromSet.initialState,
    deleteWebhook: actions.deleteWebhook.initialState,
    editMessageCaption: actions.editMessageCaption.initialState,
    editMessageLiveLocation: actions.editMessageLiveLocation.initialState,
    editMessageMedia: actions.editMessageMedia.initialState,
    editMessageReplyMarkup: actions.editMessageReplyMarkup.initialState,
    editMessageText: actions.editMessageText.initialState,
    exportChatInviteLink: actions.exportChatInviteLink.initialState,
    forwardMessage: actions.forwardMessage.initialState,
    getChat: actions.getChat.initialState,
    getChatAdministrators: actions.getChatAdministrators.initialState,
    getChatMember: actions.getChatMember.initialState,
    getChatMembersCount: actions.getChatMembersCount.initialState,
    getFile: actions.getFile.initialState,
    getGameHighScores: actions.getGameHighScores.initialState,
    getMe: actions.getMe.initialState,
    getStickerSet: actions.getStickerSet.initialState,
    getUpdates: actions.getUpdates.initialState,
    getUserProfilePhotos: actions.getUserProfilePhotos.initialState,
    getWebhookInfo: actions.getWebhookInfo.initialState,
    inlineQuery: actions.inlineQuery.initialState,
    kickChatMember: actions.kickChatMember.initialState,
    leaveChat: actions.leaveChat.initialState,
    message: actions.message.initialState,
    pinChatMessage: actions.pinChatMessage.initialState,
    promoteChatMember: actions.promoteChatMember.initialState,
    restrictChatMember: actions.restrictChatMember.initialState,
    sendAnimation: actions.sendAnimation.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendChatAction: actions.sendChatAction.initialState,
    sendContact: actions.sendContact.initialState,
    sendDocument: actions.sendDocument.initialState,
    sendGame: actions.sendGame.initialState,
    sendInvoice: actions.sendInvoice.initialState,
    sendLocation: actions.sendLocation.initialState,
    sendMediaGroup: actions.sendMediaGroup.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendPhoto: actions.sendPhoto.initialState,
    sendPoll: actions.sendPoll.initialState,
    sendSticker: actions.sendSticker.initialState,
    sendVenue: actions.sendVenue.initialState,
    sendVideo: actions.sendVideo.initialState,
    sendVideoNote: actions.sendVideoNote.initialState,
    sendVoice: actions.sendVoice.initialState,
    setChatDescription: actions.setChatDescription.initialState,
    setChatPhoto: actions.setChatPhoto.initialState,
    setChatStickerSet: actions.setChatStickerSet.initialState,
    setChatTitle: actions.setChatTitle.initialState,
    setGameScore: actions.setGameScore.initialState,
    setPassportDataErrors: actions.setPassportDataErrors.initialState,
    setStickerPositionInSet: actions.setStickerPositionInSet.initialState,
    setWebhook: actions.setWebhook.initialState,
    stopMessageLiveLocation: actions.stopMessageLiveLocation.initialState,
    stopPoll: actions.stopPoll.initialState,
    unbanChatMember: actions.unbanChatMember.initialState,
    unpinChatMessage: actions.unpinChatMessage.initialState,
    uploadStickerFile: actions.uploadStickerFile.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState
  };
  const stateResult: IState = {
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
    ...stateResult,
    message: {
      ...stateResult.message,
      query: undefined
    }
  };
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...stateResult,
    message: {
      ...stateResult.message,
      query: {
        ...(stateResult.message.query as IStateMessageQuery),
        message: undefined
      }
    }
  };
  const error: Error = new Error("");
  const query: string = encode("small");
  const result: IStateYoutubeDownloadResultInsertQuery = {
    duration: 0,
    file_id: "",
    file_size: 0,
    height: 0,
    id: "",
    mime_type: "",
    thumb: {
      file_id: "",
      file_size: 0,
      height: 0,
      width: 0
    },
    title: "",
    width: 0
  };
  const resultCache: IStateYoutubeDownloadResultInsertQuery = {
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
  const resultCacheMimeType: IStateYoutubeDownloadResultInsertQuery = {
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
  const resultCacheThumb: IStateYoutubeDownloadResultInsertQuery = {
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
    caption: caption(""),
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
    reply_to_message_id: 0,
    supports_streaming: true,
    thumb: fs.createReadStream(pathThumb("small")),
    video: fs.createReadStream(pathVideo("small")),
    width: 0
  };
  const sendVideoQueryCache: IStateSendVideoQuery = {
    caption: caption(""),
    chat_id: 0,
    disable_notification: true,
    duration: 0,
    height: 0,
    parse_mode: "HTML",
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
        a: actions.youtubeDownload.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
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
        IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a-b", {
        a: actions.getChatMember.query({ query: getChatMemberQuery }),
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
        a: actions.youtubeDownload.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
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
        IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.getChatMember.query({ query: getChatMemberQuery }),
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
        stateResult
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
        IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a-b", {
        a: actions.getChatMember.query({ query: getChatMemberQuery }),
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
        a: actions.youtubeDownload.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
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
        IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.getChatMember.query({ query: getChatMemberQuery }),
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
        a: actions.youtubeDownload.query({ query })
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
        IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
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
        a: actions.youtubeDownload.query({ query })
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
        IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
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
        a: actions.youtubeDownload.query({ query })
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
        IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
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
        a: actions.youtubeDownload.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateResult
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
        IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
      > = epic.youtubeDownload(action$, state$, dependencies);
      expectObservable(output$).toBe("-a---b", {
        a: actions.getChatMember.query({ query: getChatMemberQuery }),
        b: actions.sendVideo.query({ query: sendVideoQuery })
      });
    });
  });

  describe("youtubeDownload epic cache", (): void => {
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
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          stateResult
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
          IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a-b", {
          a: actions.getChatMember.query({ query: getChatMemberQuery }),
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
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          stateResult
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
          IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({ query: getChatMemberQuery }),
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
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          stateResult
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
          IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a-b", {
          a: actions.getChatMember.query({ query: getChatMemberQuery }),
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
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          stateResult
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
          IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({ query: getChatMemberQuery }),
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
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          stateResult
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
          IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a-b", {
          a: actions.getChatMember.query({ query: getChatMemberQuery }),
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
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          stateResult
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
          IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
        > = epic.youtubeDownload(action$, state$, dependencies);
        expectObservable(output$).toBe("-a---b", {
          a: actions.getChatMember.query({ query: getChatMemberQuery }),
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
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          stateResult
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
          IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
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
                a: actions.getChatMember.query({ query: getChatMemberQuery }),
                b: actions.sendVideo.query({ query: sendVideoQueryCache })
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
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          stateResult
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
          IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
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
                a: actions.getChatMember.query({ query: getChatMemberQuery }),
                b: actions.sendVideo.query({ query: sendVideoQueryCache })
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
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          stateResult
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
          IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
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
                a: actions.getChatMember.query({ query: getChatMemberQuery }),
                b: actions.sendVideo.query({ query: sendVideoQueryCache })
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
          a: actions.youtubeDownload.query({ query })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          stateResult
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
          IActionGetChatMember | IActionSendVideo | IActionYoutubeDownload
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
                a: actions.getChatMember.query({ query: getChatMemberQuery }),
                b: actions.sendVideo.query({ query: sendVideoQueryCache })
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
