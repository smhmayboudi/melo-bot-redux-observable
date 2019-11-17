---
to: src/epics/<%= h.changeCase.camel(name)%>.ts
unless_exists: true
---
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IAction<%= h.changeCase.pascal(name)%> } from "../../types/iAction<%= h.changeCase.pascal(name)%>";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const <%= h.changeCase.camel(name)%>: (
  action$: Observable<IAction<%= h.changeCase.pascal(name)%>>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IAction<%= h.changeCase.pascal(name)%>> = (
  action$: Observable<IAction<%= h.changeCase.pascal(name)%>>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IAction<%= h.changeCase.pascal(name)%>> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IAction<%= h.changeCase.pascal(name)%>
  ) => Observable<IAction<%= h.changeCase.pascal(name)%>> = (
    action: IAction<%= h.changeCase.pascal(name)%>
  ): Observable<IAction<%= h.changeCase.pascal(name)%>> => {
    if (botToken === undefined) {
      return of(actions.<%= h.changeCase.camel(name)%>.error({ error: new Error(texts.epicDependencyBotTokenUndefined) }));
    }
    if (requestsObservable === undefined) {
      return of(actions.<%= h.changeCase.camel(name)%>.error({ error: new Error(texts.epicDependencyRequestsObservableUndefined) }));
    }
    if (action.<%= h.changeCase.camel(name)%>.query === undefined) {
      return of(actions.<%= h.changeCase.camel(name)%>.error({ error: new Error(texts.action<%= h.changeCase.pascal(name)%>QueryUndefined) }));
    }

    return requestsObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/<%= h.changeCase.camel(name)%>`
      },
      action.<%= h.changeCase.camel(name)%>.query
    ).pipe(
      map(
        (response: IResponse): IAction<%= h.changeCase.pascal(name)%> => {
          if (response.ok) {
            return actions.<%= h.changeCase.camel(name)%>.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.<%= h.changeCase.camel(name)%>.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.<%= h.changeCase.camel(name)%>.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.<%= h.changeCase.camel(name)%>.<%= h.changeCase.snake(name).toUpperCase()%>_QUERY),
    switchMap(actionObservable)
  );
};

export { <%= h.changeCase.camel(name)%> };
