import { StateObservable } from "redux-observable";
import { Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionShortenList } from "../../types/iActionShortenList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateShortenListResult } from "../../types/iStateShortenListResult";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { initialDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";
import { transformShortenList } from "../utils/string";
import * as epic from "./shortenListToSendMessage";

describe("shortenList epic", (): void => {
  describe("shortenListToSendMessage", (): void => {
    const result: IStateShortenListResult[] = [
      {
        alphabet: "",
        count: 0,
        date: null,
        id: 0,
        longLink: "",
        longBase64: null,
        shortLink: ""
      }
    ];
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
          ...state$Value.message.query,
          message: undefined,
          // TODO: check it
          update_id: 0
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

    test("should handle error state$ undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionShortenList> = cold("-a", {
          a: actions.shortenList.result({ result })
        });
        const state$: StateObservable<IState> | undefined = undefined;
        const dependencies: IDependencies = {
          ...initialDependencies
        };
        const output$ = epic.shortenListToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.shortenList.error({
            error: new Error(texts.state$Undefined)
          })
        });
      });
    });

    test("should handle error state$ValueMessageQuery undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionShortenList> = cold("-a", {
          a: actions.shortenList.result({ result })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryUndefined
        );
        const dependencies: IDependencies = {
          ...initialDependencies
        };
        const output$ = epic.shortenListToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.shortenList.error({
            error: new Error(texts.state$ValueMessageQueryUndefined)
          })
        });
      });
    });

    test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionShortenList> = cold("-a", {
          a: actions.shortenList.result({ result })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$ValueMessageQueryMessageUndefined
        );
        const dependencies: IDependencies = {
          ...initialDependencies
        };
        const output$ = epic.shortenListToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.shortenList.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined)
          })
        });
      });
    });

    test("should handle result", (): void => {
      testScheduler.run((runHelpers: RunHelpers): void => {
        const { cold, expectObservable } = runHelpers;
        const action$: ColdObservable<IActionShortenList> = cold("-a", {
          a: actions.shortenList.result({ result })
        });
        const state$: StateObservable<IState> | undefined = new StateObservable(
          new Subject(),
          state$Value
        );
        const dependencies: IDependencies = {
          ...initialDependencies
        };
        const output$ = epic.shortenListToSendMessage(
          action$,
          state$,
          dependencies
        );
        expectObservable(output$).toBe("-a", {
          a: actions.sendMessage.query({
            query: {
              chat_id: ((state$.value.message.query as IStateMessageQuery)
                .message as IMessage).chat.id,
              disable_notification: true,
              disable_web_page_preview: true,
              parse_mode: "HTML",
              reply_to_message_id: ((state$.value.message
                .query as IStateMessageQuery).message as IMessage).message_id,
              text: transformShortenList(result)
            }
          })
        });
      });
    });
  });
});
