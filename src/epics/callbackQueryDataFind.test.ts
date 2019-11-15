import { youtube_v3 } from "googleapis";

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import { Db, MongoClient } from "mongodb";
import { StateObservable } from "redux-observable";
import { Observable, of, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionCallbackQueryDataFind } from "../../types/iActionCallbackQueryDataFind";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IActionYoutubeVideoList } from "../../types/iActionYoutubeVideoList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateCallbackQueryDataFindQuery } from "../../types/iStateCallbackQueryDataFindQuery";
import { IStateCallbackQueryDataInsertQuery } from "../../types/iStateCallbackQueryDataInsertQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";
import { collectionObservable } from "../libs/mongodbObservable";

import * as epic from "./callbackQueryDataFind";

describe("callbackQueryDataFind epic", (): void => {
  const initialState: IState = {
    youtubeDownloadResultInsert:
      actions.youtubeDownloadResultInsert.initialState,
    youtubeDownloadResultFind: actions.youtubeDownloadResultFind.initialState,
    addStickerToSet: actions.addStickerToSet.initialState,
    answerCallbackQuery: actions.answerCallbackQuery.initialState,
    answerInlineQuery: actions.answerInlineQuery.initialState,
    answerPreCheckoutQuery: actions.answerPreCheckoutQuery.initialState,
    answerShippingQuery: actions.answerShippingQuery.initialState,
    callbackQueryDataFind: actions.callbackQueryDataFind.initialState,
    callbackQueryDataInsert: actions.callbackQueryDataInsert.initialState,
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
  const error: Error = new Error("");
  const query: IStateCallbackQueryDataFindQuery = {
    id: "000000000000000000000000",
    pageToken: ""
  };
  const result: IStateCallbackQueryDataInsertQuery | null = {
    nextPageToken: "",
    pageInfo: {
      resultsPerPage: 0,
      totalResults: 0
    },
    prevPageToken: ""
  };
  const resultPageInfoUndefined: IStateCallbackQueryDataInsertQuery | null = {
    ...result,
    pageInfo: undefined
  };
  const resultPageInfoResultsPerPageUndefined: IStateCallbackQueryDataInsertQuery | null = {
    ...result,
    pageInfo: {
      ...result.pageInfo,
      resultsPerPage: undefined
    }
  };
  const resultChart: IStateCallbackQueryDataInsertQuery | null = {
    ...result,
    chart: ""
  };
  const resultQ: IStateCallbackQueryDataInsertQuery | null = {
    ...result,
    q: ""
  };
  const state$Value: IState = {
    ...initialState,
    callbackQueryDataFind: {
      query
    },
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
  const state$ValueCallbackQueryDataFindQueryUndefined: IState = {
    ...state$Value,
    callbackQueryDataFind: {
      ...state$Value.callbackQueryDataFind,
      query: undefined
    }
  };
  const state$ValueCallbackQueryDataFindResultNull: IState = {
    ...state$Value,
    callbackQueryDataFind: {
      ...state$Value.callbackQueryDataFind,
      result: null
    }
  };
  const state$ValueCallbackQueryDataFindResultUndefined: IState = {
    ...state$Value,
    callbackQueryDataFind: {
      ...state$Value.callbackQueryDataFind,
      result: undefined
    }
  };
  const state$ValueCallbackQueryDataFindResultPageInfoUndefined: IState = {
    ...state$Value,
    callbackQueryDataFind: {
      ...state$Value.callbackQueryDataFind,
      result: resultPageInfoUndefined
    }
  };
  const state$ValueCallbackQueryDataFindResultPageInfoResultsPerPageUndefined: IState = {
    ...state$Value,
    callbackQueryDataFind: {
      ...state$Value.callbackQueryDataFind,
      result: resultPageInfoResultsPerPageUndefined
    }
  };
  const state$ValueChart: IState = {
    ...state$Value,
    callbackQueryDataFind: {
      ...state$Value.callbackQueryDataFind,
      result: resultChart
    }
  };
  const state$ValueQ: IState = {
    ...state$Value,
    callbackQueryDataFind: {
      ...state$Value.callbackQueryDataFind,
      result: resultQ
    }
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

  test("should handle dependency mongoClientObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: result }),
        mongoClientObservable: undefined
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(texts.epicDependencyMongoClientObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency mongoClientObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: result }),
        mongoClientObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataFind.error({ error })
      });
    });
  });

  test("should handle dependency collectionObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        collectionObservable: undefined,
        findOneObservable: () => cold("-a", { a: result }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(texts.epicDependencyCollectionObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency collectionObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        collectionObservable: (): ColdObservable<any> => cold("--#", {}, error),
        findOneObservable: () => cold("-a", { a: result }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataFind.error({ error })
      });
    });
  });

  test("should handle dependency findOneObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: undefined,
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(texts.epicDependencyFindOneObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency findOneObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: (): ColdObservable<any> => cold("--#", {}, error),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.callbackQueryDataFind.error({ error })
      });
    });
  });

  test("should handle error actionCallbackQueryDataFindQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: result }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(texts.actionCallbackQueryDataFindQueryUndefined)
        })
      });
    });
  });

  test("should handle error state$ValueCallbackQueryDataFindQery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: result }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("--a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(texts.state$Undefined)
        })
      });
    });
  });

  test("should handle error state$ValueCallbackQueryDataFindQery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueCallbackQueryDataFindQueryUndefined
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: result }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("--a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(texts.state$ValueCallbackQueryDataFindQueryUndefined)
        })
      });
    });
  });

  test("should handle error actionCallbackQueryDataFindResult null", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueCallbackQueryDataFindResultNull
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: null }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("--a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(texts.actionCallbackQueryDataFindResultUndefined)
        })
      });
    });
  });

  test("should handle error actionCallbackQueryDataFindResult undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueCallbackQueryDataFindResultUndefined
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: undefined }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("--a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(texts.actionCallbackQueryDataFindResultUndefined)
        })
      });
    });
  });

  test("should handle error actionCallbackQueryDataFindResultPageInfo undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueCallbackQueryDataFindResultPageInfoUndefined
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: resultPageInfoUndefined }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("--a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(
            texts.actionCallbackQueryDataFindResultPageInfoUndefined
          )
        })
      });
    });
  });

  test("should handle error actionCallbackQueryDataFindResultPageInfoResultsPerPage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueCallbackQueryDataFindResultPageInfoResultsPerPageUndefined
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () =>
          cold("-a", { a: resultPageInfoResultsPerPageUndefined }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("--a", {
        a: actions.callbackQueryDataFind.error({
          error: new Error(
            texts.actionCallbackQueryDataFindResultPageInfoResultsPerPageUndefined
          )
        })
      });
    });
  });

  test("should handle result chart", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueChart
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: resultChart }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("--a", {
        a: actions.youtubeVideoList.query({
          query: {
            chart: resultChart.chart,
            hl: env.GOOGLE_API_RELEVANCE_LANGUAGE,
            key: env.GOOGLE_API_KEY,
            maxResults: (result.pageInfo as youtube_v3.Schema$PageInfo)
              .resultsPerPage as number,
            part: "id,snippet",
            pageToken: query.pageToken,
            regionCode: env.GOOGLE_API_REGION_CODE
          }
        })
      });
    });
  });

  test("should handle result q", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueQ
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: resultQ }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("--a", {
        a: actions.youtubeSearchList.query({
          query: {
            key: env.GOOGLE_API_KEY,
            maxResults: (result.pageInfo as youtube_v3.Schema$PageInfo)
              .resultsPerPage as number,
            part: "id,snippet",
            pageToken: query.pageToken,
            q: resultQ.q,
            regionCode: env.GOOGLE_API_REGION_CODE,
            relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
            safeSearch: env.GOOGLE_API_SAFE_SEARCH,
            type: env.GOOGLE_API_SEARCH_LIST_TYPE
          }
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionCallbackQueryDataFind> = cold("-a", {
        a: actions.callbackQueryDataFind.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$Value
      );
      const dependencies: IDependencies = {
        collectionObservable,
        findOneObservable: () => cold("-a", { a: result }),
        mongoClientObservable: (): Observable<MongoClient> => of(connection)
      };
      const output$: Observable<
        | IActionCallbackQueryDataFind
        | IActionYoutubeSearchList
        | IActionYoutubeVideoList
      > = epic.callbackQueryDataFind(action$, state$, dependencies);
      expectObservable(output$).toBe("--a", {
        a: actions.callbackQueryDataFind.result({ result })
      });
    });
  });
});
