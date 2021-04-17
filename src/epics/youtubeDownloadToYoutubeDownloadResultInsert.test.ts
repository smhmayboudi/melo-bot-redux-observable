declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import * as fs from "fs";
import { Connection, createConnection } from "mariadb";
import { MongoClient } from "mongodb";
import { StateObservable } from "redux-observable";
import { Observable, of, Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import { IPhotoSize } from "../../types/telegramBot/types/iPhotoSize";
import { IVideo } from "../../types/telegramBot/types/iVideo";
import * as actions from "../actions";
import * as env from "../configs/env";
import { init as initDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";
import { caption, locale } from "../utils/string";
import {
  startAction,
  transformObservable
} from "./youtubeDownloadToYoutubeDownloadResultInsert";

describe("youtubeDownload epic", (): void => {
  describe("youtubeDownloadToYoutubeDownloadResultInsert", (): void => {
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

    let mariaClient: Connection;
    let mongoClient: MongoClient;
    let locales: ILocale;

    afterAll(
      async (): Promise<void> => {
        await mongoClient.close();
      }
    );

    beforeAll(
      async (): Promise<void> => {
        mariaClient = await createConnection(env.MARIA_CLIENT_URI);
        mongoClient = await MongoClient.connect(global.__MONGO_URI__, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        locales = await locale("en");
      }
    );

    describe("transformObservable", (): void => {
      let testScheduler: TestScheduler;

      beforeEach((): void => {
        testScheduler = new TestScheduler((actual: IState, expected: IState):
          | boolean
          | void => {
          expect(actual).toEqual(expected);
        });
      });

      test("should handle error actionYoutubeDownloadResult undefined", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownload = actions.youtubeDownload.result(
            {
              result: undefined
            }
          );
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          const action2: IActionSendVideo = actions.sendVideo.result({
            result: actionYoutubeDownloadResult
          });
          expectObservable(
            transformObservable(action, dependencies)(action2)
          ).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(
                locales.find("actionYoutubeDownloadResultUndefined")
              )
            })
          });
        });
      });

      test("should handle error action2SendVideoResult undefined", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownload = actions.youtubeDownload.result(
            {
              result
            }
          );
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          const action2: IActionSendVideo = actions.sendVideo.result({
            result: undefined
          });
          expectObservable(
            transformObservable(action, dependencies)(action2)
          ).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(locales.find("actionSendVideoResultUndefined"))
            })
          });
        });
      });

      test("should handle error action2SendVideoResultVideo undefined", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownload = actions.youtubeDownload.result(
            {
              result
            }
          );
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          const action2: IActionSendVideo = actions.sendVideo.result({
            result: actionYoutubeDownloadResultVideoUndefined
          });
          expectObservable(
            transformObservable(action, dependencies)(action2)
          ).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(
                locales.find("actionYoutubeDownloadResultVideoUndefined")
              )
            })
          });
        });
      });

      test("should handle result", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownload = actions.youtubeDownload.result(
            {
              result
            }
          );
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          const action2: IActionSendVideo = actions.sendVideo.result({
            result: actionYoutubeDownloadResult
          });
          expectObservable(
            transformObservable(action, dependencies)(action2)
          ).toBe("(a|)", {
            a: actions.youtubeDownloadResultInsert.query({
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
          });
        });
      });
    });

    describe("startAction", (): void => {
      test("should handle error state$ undefined", (): void => {
        const action: IActionYoutubeDownload = actions.youtubeDownload.result({
          result
        });
        const state$: StateObservable<IState> | undefined = undefined;
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        expect(startAction(action, state$, dependencies)).toEqual(
          actions.youtubeDownload.error({
            error: new Error(locales.find("state$Undefined"))
          })
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
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        expect(startAction(action, state$, dependencies)).toEqual(
          actions.youtubeDownload.error({
            error: new Error(locales.find("state$ValueMessageQueryUndefined"))
          })
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
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        expect(startAction(action, state$, dependencies)).toEqual(
          actions.youtubeDownload.error({
            error: new Error(
              locales.find("state$ValueMessageQueryMessageUndefined")
            )
          })
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
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        expect(startAction(action, state$, dependencies)).toEqual(
          actions.youtubeDownload.error({
            error: new Error(
              locales.find("actionYoutubeDownloadResultUndefined")
            )
          })
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
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        expect(startAction(action, state$, dependencies)).toEqual(
          actions.youtubeDownload.error({
            error: new Error(
              locales.find("actionYoutubeDownloadResultThumbUndefined")
            )
          })
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
        const dependencies: IDependencies = {
          ...initDependencies(locales, mariaClient, mongoClient),
          authorization: (): Observable<boolean> => of(true)
        };
        expect(
          JSON.stringify(startAction(action, state$, dependencies))
        ).toEqual(
          JSON.stringify(
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
                thumb: fs.createReadStream(
                  (result.thumb as IPhotoSize).file_id
                ),
                video: fs.createReadStream(result.file_id),
                width: result.width
              }
            })
          )
        );
      });
    });
  });
});
