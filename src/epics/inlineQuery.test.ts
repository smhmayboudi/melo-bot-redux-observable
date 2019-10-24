import { StateObservable } from "redux-observable";
import { Observable, Subject } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionInlineQuery } from "../../types/iActionInlineQuery";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IStateInlineQueryQuery } from "../../types/iStateInlineQueryQuery";
import { IStateMessage } from "../../types/iStateMessage";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import * as epic from "../epics/inlineQuery";

describe("inlineQuery epic", (): void => {
  const initialState: IState = {
    answerInlineQuery: actions.answerInlineQuery.initialState,
    getChatMember: actions.getChatMember.initialState,
    inlineQuery: actions.inlineQuery.initialState,
    literate: actions.literate.initialState,
    message: actions.message.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendVideo: actions.sendVideo.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState
  };
  const message: IStateMessage = {
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
  };
  const resultState: IState = {
    ...initialState,
    message
  };
  const query: IStateInlineQueryQuery = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false
    },
    id: "",
    offset: "",
    query: ""
  };

  let testScheduler: TestScheduler;

  beforeEach((): void => {
    testScheduler = new TestScheduler((actual: IState, expected: IState):
      | boolean
      | void => {
      expect(actual).toEqual(expected);
    });
  });

  test("should handle dependency botToken undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionInlineQuery> = cold("-a", {
        a: actions.inlineQuery.query({
          query
        })
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        botToken: undefined,
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionInlineQuery | IActionAnswerInlineQuery
      > = epic.inlineQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.inlineQuery.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      });
    });
  });

  test("should handle error actionInlineQueryQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionInlineQuery> = cold("-a", {
        a: actions.inlineQuery.query({})
      });
      const state$: StateObservable<IState> | undefined = new StateObservable(
        new Subject(),
        resultState
      );
      const dependencies: IDependencies = {
        botToken: "",
        requestsObservable: (): ColdObservable<any> => cold("--a")
      };
      const output$: Observable<
        IActionInlineQuery | IActionAnswerInlineQuery
      > = epic.inlineQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.inlineQuery.error({
          error: new Error(texts.actionInlineQueryQueryUndefined)
        })
      });
    });
  });
});
