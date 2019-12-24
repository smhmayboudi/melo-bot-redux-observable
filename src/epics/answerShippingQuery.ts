import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionAnswerShippingQuery } from "../../types/iActionAnswerShippingQuery";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const answerShippingQuery: (
  action$: Observable<IActionAnswerShippingQuery>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionAnswerShippingQuery> = (
  action$: Observable<IActionAnswerShippingQuery>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionAnswerShippingQuery> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionAnswerShippingQuery
  ) => Observable<IActionAnswerShippingQuery> = (
    action: IActionAnswerShippingQuery
  ): Observable<IActionAnswerShippingQuery> => {
    if (action.answerShippingQuery.query === undefined) {
      return of(
        actions.answerShippingQuery.error({
          error: new Error(
            locales.find("actionAnswerShippingQueryQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/answerShippingQuery`
      },
      action.answerShippingQuery.query
    ).pipe(
      map(
        (response: IResponse): IActionAnswerShippingQuery => {
          if (response.ok) {
            return actions.answerShippingQuery.result({
              result: response.result as boolean
            });
          }

          return actions.answerShippingQuery.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.answerShippingQuery.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.answerShippingQuery.ANSWER_SHIPPING_QUERY_QUERY),
    filterAsync((action: IActionAnswerShippingQuery, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { answerShippingQuery };
