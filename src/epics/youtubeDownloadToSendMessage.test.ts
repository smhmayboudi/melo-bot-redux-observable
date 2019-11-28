import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { initialState } from "../utils/store";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateYoutubeDownloadQuery } from "../../types/iStateYoutubeDownloadQuery";
import { transformObservable } from "./youtubeDownloadToSendMessage";
import { IMessage } from "../../types/telegramBot/types/iMessage";

describe("youtubeDownload epic", (): void => {
  describe("youtubeDownloadToSendMessage", (): void => {
    const error: Error = new Error("");
    const query: IStateYoutubeDownloadQuery = {
      id: ""
    };
    // const result: IStateYoutubeDownloadResultInsertQuery = {};
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
        expectObservable(transformObservable(action, state$)).toBe("a", {
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
        expectObservable(transformObservable(action, state$)).toBe("a", {
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
        expectObservable(transformObservable(action, state$)).toBe("a", {
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
        expectObservable(transformObservable(action, state$)).toBe("a", {
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
        expectObservable(transformObservable(action, state$)).toBe("a", {
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
