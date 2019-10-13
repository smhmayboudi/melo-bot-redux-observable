import { Action } from "redux";
import { StateObservable } from "redux-observable";
import { Observable, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as texts from "../config/texts";
import * as epic from "../epics/appError";

describe("getChatMember epic", (): void => {

  const initialState: IState = {
    getChatMember: actions.getChatMember.initialState,
    literate: actions.literate.initialState,
    message: actions.message.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendVideo: actions.sendVideo.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState,
  };
  const state$ValueMessageQueryMessageUndefined: IState = {
    ...initialState,
    message: {
      query: {
        message: undefined,
        update_id: 0,
      },
    },
  };
  const resultState: IState = {
    ...initialState,
    message: {
      query: {
        message: {
          chat: {
            id: 0,
            type: "",
          },
          date: 0,
          message_id: 0,
        },
        update_id: 0,
      },
    },
  };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler(
      (actual: IState, expected: IState): boolean | void => {
        expect(actual)
          .toEqual(expected);
      },
    );
  });

  test("should handle error state$ undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<Action<string>> = cold("-a", {
        a: { type: "ERROR" },
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {};
      const output$: Observable<IActionSendMessage> = epic.appError(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a", {
          a: actions.sendMessage.error({
            error: new Error(texts.state$Undefined),
          }),
        });
    });
  });

  test("should handle error state$ValueMessageQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<Action<string>> = cold("-a", {
        a: { type: "ERROR" },
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), initialState);
      const dependencies: IDependencies = {};
      const output$: Observable<IActionSendMessage> = epic.appError(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a", {
          a: actions.sendMessage.error({
            error: new Error(texts.state$ValueMessageQueryUndefined),
          }),
        });
    });
  });

  test("should handle error state$ValueMessageQueryMessage undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<Action<string>> = cold("-a", {
        a: { type: "ERROR" },
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), state$ValueMessageQueryMessageUndefined);
      const dependencies: IDependencies = {};
      const output$: Observable<IActionSendMessage> = epic.appError(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a", {
          a: actions.sendMessage.error({
            error: new Error(texts.state$ValueMessageQueryMessageUndefined),
          }),
        });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<Action<string>> = cold("-a", {
        a: { type: "ERROR" },
      });
      const state$: StateObservable<IState> | undefined =
        new StateObservable(new Subject(), resultState);
      const dependencies: IDependencies = {};
      const output$: Observable<IActionSendMessage> = epic.appError(action$, state$, dependencies);
      expectObservable(output$)
        .toBe("-a", {
          a: actions.sendMessage.query({
            query: {
              chat_id: ((state$.value.message.query as IStateMessageQuery).message as IMessage).chat.id,
              disable_notification: true,
              disable_web_page_preview: true,
              parse_mode: "HTML",
              reply_markup: { remove_keyboard: true },
              reply_to_message_id: ((state$.value.message.query as IStateMessageQuery).message as IMessage).message_id,
              text: texts.messageError,
            },
          }),
        });
    });
  });

});
