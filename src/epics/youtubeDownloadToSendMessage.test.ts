import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeDownloadQuery } from "../../types/iStateYoutubeDownloadQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { initialState } from "../utils/store";
import { transformObservable } from "./youtubeDownloadToSendMessage";

describe("youtubeDownload epic", (): void => {
  describe("youtubeDownloadToSendMessage", (): void => {
    const error: Error = new Error("");
    const query: IStateYoutubeDownloadQuery = {
      id: ""
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

    let testScheduler: TestScheduler;

    beforeEach((): void => {
      testScheduler = new TestScheduler((actual: IState, expected: IState):
        | boolean
        | void => {
        expect(actual).toEqual(expected);
      });
    });

    test("should handle error", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeDownload = actions.youtubeDownload.error({
          error
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
          a: action
        });
      });
    });

    test("should handle error state$ undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeDownload = actions.youtubeDownload.query({
          query
        });
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
        const action: IActionYoutubeDownload = actions.youtubeDownload.query({
          query
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
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
        const action: IActionYoutubeDownload = actions.youtubeDownload.query({
          query
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
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

    test("should handle result", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { expectObservable } = runHelpers;
        const action: IActionYoutubeDownload = actions.youtubeDownload.query({
          query
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        expectObservable(transformObservable(state$)(action)).toBe("(a|)", {
          a: actions.sendMessage.query({
            query: {
              chat_id: ((state$Value.message.query as IStateMessageQuery)
                .message as IMessage).chat.id,
              disable_notification: true,
              disable_web_page_preview: true,
              parse_mode: "HTML",
              reply_to_message_id: ((state$Value.message
                .query as IStateMessageQuery).message as IMessage).message_id,
              text: texts.messageChannelJoin
            }
          })
        });
      });
    });
  });
});
