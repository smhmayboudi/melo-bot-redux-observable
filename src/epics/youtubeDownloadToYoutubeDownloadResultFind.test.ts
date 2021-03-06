declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_DB_NAME__: string;
      __MONGO_URI__: string;
    }
  }
}

import { Connection, createConnection } from "mariadb";
import { MongoClient } from "mongodb";
import { StateObservable } from "redux-observable";
import { Observable, of, Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IActionYoutubeDownloadResultFind } from "../../types/iActionYoutubeDownloadResultFind";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeDownloadResultFindQuery } from "../../types/iStateYoutubeDownloadResultFindQuery";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import { IPhotoSize } from "../../types/telegramBot/types/iPhotoSize";
import * as actions from "../actions";
import * as env from "../configs/env";
import { init as initDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";
import { caption, locale } from "../utils/string";
import {
  startAction,
  transformObservable
} from "./youtubeDownloadToYoutubeDownloadResultFind";

describe("youtubeDownload epic", (): void => {
  describe("youtubeDownloadToYoutubeDownloadResultFind", (): void => {
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

      test("should handle error state$ undefined", (): void => {
        testScheduler.run((runHelpers: RunHelpers): void => {
          const { expectObservable } = runHelpers;
          const action: IActionYoutubeDownloadResultFind = actions.youtubeDownloadResultFind.result(
            { result }
          );
          const state$: StateObservable<IState> | undefined = undefined;
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          expectObservable(
            transformObservable(state$, dependencies)(action)
          ).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(locales.find("state$Undefined"))
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
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          expectObservable(
            transformObservable(state$, dependencies)(action)
          ).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(locales.find("state$ValueMessageQueryUndefined"))
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
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          expectObservable(
            transformObservable(state$, dependencies)(action)
          ).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(
                locales.find("state$ValueMessageQueryMessageUndefined")
              )
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
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          expectObservable(
            transformObservable(state$, dependencies)(action)
          ).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(
                locales.find("actionYoutubeDownloadResultUndefined")
              )
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
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          expectObservable(
            transformObservable(state$, dependencies)(action)
          ).toBe("(a|)", {
            a: actions.youtubeDownload.error({
              error: new Error(
                locales.find("actionYoutubeDownloadResultThumbUndefined")
              )
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
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          expectObservable(
            transformObservable(state$, dependencies)(action)
          ).toBe("(a|)", {
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

      describe("startAction", (): void => {
        test("should handle error actionYoutubeDownloadQuery undefined", (): void => {
          const action: IActionYoutubeDownload = actions.youtubeDownload.query({
            query: undefined
          });
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          expect(startAction(action, dependencies)).toEqual(
            actions.youtubeDownload.error({
              error: new Error(
                locales.find("actionYoutubeDownloadQueryUndefined")
              )
            })
          );
        });

        test("should handle result", (): void => {
          const action: IActionYoutubeDownload = actions.youtubeDownload.query({
            query: query
          });
          const dependencies: IDependencies = {
            ...initDependencies(locales, mariaClient, mongoClient),
            authorization: (): Observable<boolean> => of(true)
          };
          expect(startAction(action, dependencies)).toEqual(
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
});
