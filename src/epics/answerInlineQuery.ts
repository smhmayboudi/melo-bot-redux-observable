import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";

const answerInlineQuery: (
  action$: Observable<IActionAnswerInlineQuery>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionAnswerInlineQuery> = (
  action$: Observable<IActionAnswerInlineQuery>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionAnswerInlineQuery> => {
  const { botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionAnswerInlineQuery
  ) => Observable<IActionAnswerInlineQuery> = (
    action: IActionAnswerInlineQuery
  ): Observable<IActionAnswerInlineQuery> => {
    if (action.answerInlineQuery.query === undefined) {
      return of(
        actions.answerInlineQuery.error({
          error: new Error(
            locales.find("actionAnswerInlineQueryQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/answerInlineQuery`
      },
      action.answerInlineQuery.query
    ).pipe(
      map(
        (response: IResponse): IActionAnswerInlineQuery => {
          if (response.ok) {
            return actions.answerInlineQuery.result({
              result: response.result as boolean
            });
          }

          return actions.answerInlineQuery.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.answerInlineQuery.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.answerInlineQuery.ANSWER_INLINE_QUERY_QUERY),
    switchMap(actionObservable)
  );
};

export { answerInlineQuery };
