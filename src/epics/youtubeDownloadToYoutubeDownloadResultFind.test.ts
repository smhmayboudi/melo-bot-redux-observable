import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { initialState } from "../utils/store";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import { IPhotoSize } from "../../types/telegramBot/types/iPhotoSize";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeDownloadResultFindQuery } from "../../types/iStateYoutubeDownloadResultFindQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import * as actions from "../actions";
import * as texts from "../configs/texts";

import { caption } from "../utils/string";

import {
  transformObservable,
  startAction
} from "./youtubeDownloadToYoutubeDownloadResultFind";

describe("youtubeDownload epic", (): void => {
  describe("youtubeDownloadToYoutubeDownloadResultFind", (): void => {
    // const error: Error = new Error("");
    const query: IStateYoutubeDownloadResultFindQuery = {
      id: ""
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
    const actionYoutubeDownloadResultThumbUndefined: IStateYoutubeDownloadResultInsertQuery | null = {
      ...result,
      thumb: undefined
    };

    describe("transformObservable", (): void => {
      let testScheduler: TestScheduler;

      beforeEach((): void => {
        testScheduler = new TestScheduler((actual: IState, expected: IState):
          | boolean
          | void => {
          expect(actual).toEqual(expected);
        });
      });

      test("should handle error state$ undefined", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
            { result }
          );
          const state$: StateObservable<IState> | undefined = undefined;
          expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(texts.state$Undefined)
            })
          });
        });
      });

      test("should handle error state$ValueMessageQuery undefined", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
            { result }
          );
          const state$:
            | StateObservable<IState>
            | undefined = new StateObservable(
            new Subject(),
            state$ValueMessageQueryUndefined
          );
          expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(texts.state$ValueMessageQueryUndefined)
            })
          });
        });
      });

      test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
            { result }
          );
          const state$:
            | StateObservable<IState>
            | undefined = new StateObservable(
            new Subject(),
            state$ValueMessageQueryMessageUndefined
          );
          expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(texts.state$ValueMessageQueryMessageUndefined)
            })
          });
        });
      });

      test("should handle error actionYoutubeDownloadResultFindResult undefined", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
            { result: undefined }
          );
          const state$:
            | StateObservable<IState>
            | undefined = new StateObservable(new Subject(), state$Value);
          expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(texts.actionYoutubeDownloadResultUndefined)
            })
          });
        });
      });

      test("should handle error actionYoutubeDownloadResultFindResultThumb undefined", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
            { result: actionYoutubeDownloadResultThumbUndefined }
          );
          const state$:
            | StateObservable<IState>
            | undefined = new StateObservable(new Subject(), state$Value);
          expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(texts.actionYoutubeDownloadResultThumbUndefined)
            })
          });
        });
      });

      test("should handle result", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
            { result }
          );
          const state$:
            | StateObservable<IState>
            | undefined = new StateObservable(new Subject(), state$Value);
          expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
            a: actions.sendVideo.query({
              query: {
                caption: caption(result.title),
                chat_id: ((state$Value.message.query as IStateMessageQuery)
                  .message as IMessage).chat.id,
                disable_notification: true,
                duration: result.duration,
                height: result.height,
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        callback_data: "callback_data:OK",
                        text: "OK"
                      },
                      {
                        callback_data: "callback_data:NOK",
                        text: "NOK"
                      }
                    ]
                  ]
                },
                reply_to_message_id: ((state$Value.message
                  .query as IStateMessageQuery).message as IMessage).message_id,
                supports_streaming: true,
                thumb: (result.thumb as IPhotoSize).file_id,
                video: result.file_id,
                width: result.width
              }
            })
          });
        });
      });
    });

    describe("startAction", (): void => {
      test("should handle error actionYoutubeDownloadQuery undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.query({
          query: undefined
        });
        expect(startAction(action)).toEqual(
          actions.youtubeDownload.error({
            error: new Error(texts.actionYoutubeDownloadQueryUndefined)
          })
        );
      });

      test("should handle result", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.query({
          query: query
        });
        expect(startAction(action)).toEqual(
          actions.youtubeDownloadResultFind.query({
            query: {
              id: query.id
            }
          })
        );
      });
    });
  });
});
