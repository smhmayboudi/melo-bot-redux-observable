import { youtube_v3 } from "googleapis";
import { StateObservable } from "redux-observable";
import { Observable, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateInlineQueryQuery } from "../../types/iStateInlineQueryQuery";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeSearchListQuery } from "../../types/iStateYoutubeSearchListQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { transformSearchResults as transformSearchListInlineQueryResultArticle } from "../utils/inlineQueryResultArticle";
import { transformSearchResults as transformSearchListString } from "../utils/string";

import * as epic from "./youtubeSearchList";

describe("youtubeSearchList epic", (): void => {
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
  const stateInlineQueryResult: IState = {
    ...initialState,
    inlineQuery: {
      query: {
        from: {
          first_name: "",
          id: 0,
          is_bot: false
        },
        id: "",
        offset: "",
        query: ""
      }
    },
    youtubeSearchList: {
      query: {
        key: "",
        q: ""
      }
    }
  };
  const state$InlineQueryValueInlineQueryQuery: IState = {
    ...stateInlineQueryResult,
    inlineQuery: {
      ...stateInlineQueryResult.inlineQuery,
      query: undefined
    }
  };
  const state$InlineQueryValueYoutubeSearchListQuery: IState = {
    ...stateInlineQueryResult,
    youtubeSearchList: {
      ...stateInlineQueryResult.youtubeSearchList,
      query: undefined
    }
  };
  const state$InlineQueryValueYoutubeSearchListQueryQ: IState = {
    ...stateInlineQueryResult,
    youtubeSearchList: {
      ...stateInlineQueryResult.youtubeSearchList,
      query: {
        ...(stateInlineQueryResult.youtubeSearchList
          .query as IStateYoutubeSearchListQuery),
        q: undefined
      }
    }
  };
  const stateMessageResult: IState = {
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
    },
    youtubeSearchList: {
      query: {
        key: "",
        q: ""
      }
    }
  };
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...stateMessageResult,
    message: {
      ...stateMessageResult.message,
      query: {
        ...(stateMessageResult.message.query as IStateMessageQuery),
        message: undefined
      }
    }
  };
  const state$ValueMessageQueryUndefined: IState = {
    ...stateMessageResult,
    message: {
      ...stateMessageResult.message,
      query: undefined
    }
  };
  const state$MessageValueYoutubeSearchListQuery: IState = {
    ...stateMessageResult,
    youtubeSearchList: {
      ...stateMessageResult.youtubeSearchList,
      query: undefined
    }
  };
  const state$MessageValueYoutubeSearchListQueryQ: IState = {
    ...stateMessageResult,
    youtubeSearchList: {
      ...stateMessageResult.youtubeSearchList,
      query: {
        ...(stateMessageResult.youtubeSearchList
          .query as IStateYoutubeSearchListQuery),
        q: undefined
      }
    }
  };
  const error: Error = new Error("");
  const query: IStateYoutubeSearchListQuery = {
    key: "",
    q: ""
  };
  const result: youtube_v3.Schema$SearchListResponse = {
    items: [
      {
        id: {
          videoId: ""
        },
        snippet: {
          title: ""
        }
      }
    ]
  };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency requestsObservable undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateMessageResult
      );
      const dependencies: IDependencies = {
        requestsObservable: undefined
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      });
    });
  });

  test("should handle dependency requestsObservable error", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateMessageResult
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> => cold("--#", {}, error)
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({ error })
      });
    });
  });

  test("should handle error actionYoutubeSearchListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({})
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateMessageResult
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: { items: undefined } })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.actionYoutubeSearchListQueryUndefined)
        })
      });
    });
  });

  test("should handle error actionYoutubeSearchListResult undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: undefined })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.actionYoutubeSearchListResultUndefined)
        })
      });
    });
  });

  test("should handle error actionYoutubeSearchListResultItems undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateMessageResult
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: { items: undefined } })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.actionYoutubeSearchListResultItemsUndefined)
        })
      });
    });
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$Undefined)
        })
      });
    });
  });

  test("should handle error inline state$ValueInlineQueryQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$InlineQueryValueInlineQueryQuery
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueInlineQueryQueryUndefined)
        })
      });
    });
  });

  test("should handle error inline state$ValueYoutubeSearchListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$InlineQueryValueYoutubeSearchListQuery
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined)
        })
      });
    });
  });

  test("should handle error inline state$ValueYoutubeSearchListQueryQ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$InlineQueryValueYoutubeSearchListQueryQ
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueYoutubeSearchListQueryQUndefined)
        })
      });
    });
  });

  test("should handle result inline", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateInlineQueryResult
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.answerInlineQuery.query({
          query: {
            inline_query_id: (stateInlineQueryResult.inlineQuery
              .query as IStateInlineQueryQuery).id,
            is_personal: true,
            results: transformSearchListInlineQueryResultArticle(
              result.items,
              stateInlineQueryResult.youtubeSearchList.query.q
            ),
            switch_pm_parameter: "string",
            switch_pm_text: texts.actionAnswerInlineQueryQuerySwitchPMText
          }
        })
      });
    });
  });

  test("should handle error message state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryUndefined
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      });
    });
  });

  test("should handle error message state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$ValueMessageQueryMessageUndefined
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        })
      });
    });
  });

  test("should handle error message state$ValueYoutubeSearchListQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$MessageValueYoutubeSearchListQuery
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueYoutubeSearchListQueryUndefined)
        })
      });
    });
  });

  test("should handle error message state$ValueYoutubeSearchListQueryQ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        state$MessageValueYoutubeSearchListQueryQ
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.youtubeSearchList.error({
          error: new Error(texts.state$ValueYoutubeSearchListQueryQUndefined)
        })
      });
    });
  });

  test("should handle result message", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionYoutubeSearchList> = cold("-a", {
        a: actions.youtubeSearchList.query({ query })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        stateMessageResult
      );
      const dependencies: IDependencies = {
        requestsObservable: (): ColdObservable<any> =>
          cold("--a", { a: result })
      };
      const output$: Observable<
        IActionYoutubeSearchList | IActionSendMessage | IActionAnswerInlineQuery
      > = epic.youtubeSearchList(action$, state$, dependencies);
      expectObservable(output$).toBe("---a", {
        a: actions.sendMessage.query({
          query: {
            chat_id: 0,
            disable_notification: true,
            disable_web_page_preview: true,
            parse_mode: "HTML",
            reply_to_message_id: 0,
            text: transformSearchListString(
              result.items,
              stateInlineQueryResult.youtubeSearchList.query.q
            )
          }
        })
      });
    });
  });
});
