import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionAnswerCallbackQuery } from "../../types/iActionAnswerCallbackQuery";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const answerCallbackQuery: (
  action$: Observable<IActionAnswerCallbackQuery>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionAnswerCallbackQuery> = (
  action$: Observable<IActionAnswerCallbackQuery>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionAnswerCallbackQuery> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionAnswerCallbackQuery
  ) => Observable<IActionAnswerCallbackQuery> = (
    action: IActionAnswerCallbackQuery
  ): Observable<IActionAnswerCallbackQuery> => {
    if (botToken === undefined) {
      return of(
        actions.answerCallbackQuery.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.answerCallbackQuery.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.answerCallbackQuery.query === undefined) {
      return of(
        actions.answerCallbackQuery.error({
          error: new Error(texts.actionAnswerCallbackQueryQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/answerCallbackQuery`
      },
      action.answerCallbackQuery.query
    ).pipe(
      map(
        (response: IResponse): IActionAnswerCallbackQuery => {
          if (response.ok) {
            return actions.answerCallbackQuery.result({
              result: response.result as boolean
            });
          }

          return actions.answerCallbackQuery.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.answerCallbackQuery.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.answerCallbackQuery.ANSWER_CALLBACK_QUERY_QUERY),
    switchMap(actionObservable)
  );
};

export { answerCallbackQuery };