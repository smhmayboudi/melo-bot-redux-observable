import { StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
import { TestScheduler } from "rxjs/testing";

import { IActionInlineQuery } from "../../types/iActionInlineQuery";
import { IActionYoutubeSearchList } from "../../types/iActionYoutubeSearchList";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateInlineQueryQuery } from "../../types/iStateInlineQueryQuery";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as epic from "../epics/inlineQuery";
import { init as initDependencies } from "../utils/dependencies";
import { locale } from "../utils/string";

describe("inlineQuery epic", (): void => {
  const locales: ILocale = locale("en");
  const query: IStateInlineQueryQuery = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false,
      language_code: "en"
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

  test("should handle error actionInlineQueryQuery undefined", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: Observable<IActionInlineQuery> = cold("-a", {
        a: actions.inlineQuery.query({ query: undefined })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies
      };
      const output$: Observable<
        IActionInlineQuery | IActionYoutubeSearchList
      > = epic.inlineQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.inlineQuery.error({
          error: new Error(locales.find("actionInlineQueryQueryUndefined"))
        })
      });
    });
  });

  test("should handle result", (): void => {
    testScheduler.run((runHelpers: RunHelpers): void => {
      const { cold, expectObservable } = runHelpers;
      const action$: ColdObservable<IActionInlineQuery> = cold("-a", {
        a: actions.inlineQuery.query({ query })
      });
      const state$: StateObservable<IState> | undefined = undefined;
      const dependencies: IDependencies = {
        ...initDependencies(locales).initDependencies
      };
      const output$: Observable<
        IActionInlineQuery | IActionYoutubeSearchList
      > = epic.inlineQuery(action$, state$, dependencies);
      expectObservable(output$).toBe("-a", {
        a: actions.youtubeSearchList.query({
          query: {
            key: env.GOOGLE_API_KEY,
            maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
            pageToken: "",
            part: "id,snippet",
            q: query.query,
            regionCode: env.GOOGLE_API_REGION_CODE,
            relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
            safeSearch: env.GOOGLE_API_SAFE_SEARCH,
            type: env.GOOGLE_API_SEARCH_LIST_TYPE
          }
        })
      });
    });
  });
});
