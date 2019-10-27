import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendDocument } from "../../types/iActionSendDocument";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const sendDocument: (
  action$: Observable<IActionSendDocument>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendDocument> = (
  action$: Observable<IActionSendDocument>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendDocument> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionSendDocument
  ) => Observable<IActionSendDocument> = (
    action: IActionSendDocument
  ): Observable<IActionSendDocument> => {
    if (botToken === undefined) {
      return of(
        actions.sendDocument.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.sendDocument.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.sendDocument.query === undefined) {
      return of(
        actions.sendDocument.error({
          error: new Error(texts.actionSendDocumentQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendDocument`
      },
      action.sendDocument.query
    ).pipe(
      map(
        (response: IResponse): IActionSendDocument => {
          if (response.ok) {
            return actions.sendDocument.result({
              // TODO: check it
              result: response.result as boolean
            });
          }

          return actions.sendDocument.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendDocument.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendDocument.SEND_DOCUMENT_QUERY),
    switchMap(actionObservable)
  );
};

export { sendDocument };
