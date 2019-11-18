// import * as fs from "fs";

import { StateObservable } from "redux-observable";
import { of, Subject } from "rxjs";

import { initialState } from "../utils/store";
import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import { IPhotoSize } from "../../types/telegramBot/types/iPhotoSize";
import { IState } from "../../types/iState";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IVideo } from "../../types/telegramBot/types/iVideo";
import * as actions from "../actions";
import * as texts from "../configs/texts";

import { caption } from "../utils/string";

import {
  transformObservableSendVideo,
  startActionSendVideo
} from "./youtubeDownloadToYoutubeDownloadResultInsert";

describe("youtubeDownload epic", (): void => {
  describe("youtubeDownloadToYoutubeDownloadResultInsert", (): void => {
    // const error: Error = new Error("");
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
    const actionYoutubeDownloadResult: IMessage = {
      chat: {
        id: 0,
        type: ""
      },
      date: 0,
      message_id: 0,
      video: {
        duration: 0,
        file_id: "./asset/small.mp4",
        file_size: 0,
        height: 0,
        mime_type: "",
        thumb: {
          file_id: "./asset/small.jpg",
          height: 0,
          width: 0
        },
        width: 0
      }
    };
    const actionYoutubeDownloadResultVideoUndefined: IMessage = {
      ...actionYoutubeDownloadResult,
      video: undefined
    };
    const result: IStateYoutubeDownloadResultInsertQuery = {
      duration: 0,
      file_id: "./asset/small.mp4",
      height: 0,
      id: "",
      thumb: {
        file_id: "./asset/small.jpg",
        height: 0,
        width: 0
      },
      title: "",
      width: 0
    };
    const actionYoutubeDownloadResultThumbUndefined: IStateYoutubeDownloadResultInsertQuery | null = {
      ...result,
      thumb: undefined
    };

    describe("transformObservableSendVideo", (): void => {
      test("should handle error actionYoutubeDownloadResult undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result: undefined
        });
        const action2: IActionSendVideo = actions.sendVideo.result({
          result: actionYoutubeDownloadResult
        });
        expect(transformObservableSendVideo(action)(action2)).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.actionYoutubeDownloadResultUndefined)
            })
          )
        );
      });

      test("should handle error action2SendVideoResult undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result
        });
        const action2: IActionSendVideo = actions.sendVideo.result({
          result: undefined
        });
        expect(transformObservableSendVideo(action)(action2)).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.actionSendVideoResultUndefined)
            })
          )
        );
      });

      test("should handle error action2SendVideoResultVideo undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result
        });
        const action2: IActionSendVideo = actions.sendVideo.result({
          result: actionYoutubeDownloadResultVideoUndefined
        });
        expect(transformObservableSendVideo(action)(action2)).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.actionYoutubeDownloadResultVideoUndefined)
            })
          )
        );
      });

      test("should handle result", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result
        });
        const action2: IActionSendVideo = actions.sendVideo.result({
          result: actionYoutubeDownloadResult
        });
        expect(transformObservableSendVideo(action)(action2)).toEqual(
          of(
            actions.youtubeDownloadResultInsert.query({
              query: {
                duration: (actionYoutubeDownloadResult.video as IVideo)
                  .duration,
                file_id: (actionYoutubeDownloadResult.video as IVideo).file_id,
                file_size: (actionYoutubeDownloadResult.video as IVideo)
                  .file_size,
                height: (actionYoutubeDownloadResult.video as IVideo).height,
                id: (action.youtubeDownload
                  .result as IStateYoutubeDownloadResultInsertQuery).id,
                mime_type: (actionYoutubeDownloadResult.video as IVideo)
                  .mime_type,
                thumb: (actionYoutubeDownloadResult.video as IVideo).thumb,
                title: (action.youtubeDownload
                  .result as IStateYoutubeDownloadResultInsertQuery).title,
                width: (actionYoutubeDownloadResult.video as IVideo).width
              }
            })
          )
        );
      });
    });

    describe("startActionSendVideo", (): void => {
      test("should handle error state$ undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result
        });
        const state$: StateObservable<IState> | undefined = undefined;
        expect(startActionSendVideo(action, state$)).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.state$Undefined)
            })
          )
        );
      });

      test("should handle error state$ValueMessageQuery undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryUndefined
        );
        expect(startActionSendVideo(action, state$)).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.state$ValueMessageQueryUndefined)
            })
          )
        );
      });

      test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryMessageUndefined
        );
        expect(startActionSendVideo(action, state$)).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.state$ValueMessageQueryMessageUndefined)
            })
          )
        );
      });

      test("should handle error actionYoutubeDownloadResult undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result: undefined
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expect(startActionSendVideo(action, state$)).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.actionYoutubeDownloadResultUndefined)
            })
          )
        );
      });

      test("should handle error actionYoutubeDownloadResultThumb undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result: actionYoutubeDownloadResultThumbUndefined
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expect(startActionSendVideo(action, state$)).toEqual(
          of(
            actions.youtubeDownload.error({
              error: new Error(texts.actionYoutubeDownloadResultThumbUndefined)
            })
          )
        );
      });

      test("should handle result", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expect(startActionSendVideo(action, state$)).toEqual(
          of(
            actions.sendVideo.query({
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
          )
        );
      });
    });
  });
});
