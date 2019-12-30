import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendDocument } from "../../types/iActionSendDocument";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import { transformSendDocumentQuery } from "../utils/formData";

const sendDocument: (
  action$: Observable<IActionSendDocument>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendDocument> = (
  action$: Observable<IActionSendDocument>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendDocument> => {
  const {
    authorization,
    botToken,
    locales,
    requestsUploadObservable
  } = dependencies;

  const actionObservable: (
    action: IActionSendDocument
  ) => Observable<IActionSendDocument> = (
    action: IActionSendDocument
  ): Observable<IActionSendDocument> => {
    if (action.sendDocument.query === undefined) {
      return of(
        actions.sendDocument.error({
          error: new Error(locales.find("actionSendDocumentQueryUndefined"))
        })
      );
    }

    return requestsUploadObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendDocument`
      },
      transformSendDocumentQuery(action.sendDocument.query)
    ).pipe(
      map(
        (response: IResponse): IActionSendDocument => {
          if (response.ok) {
            return actions.sendDocument.result({
              result: response.result as IMessage
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
    filterAsync((action: IActionSendDocument, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { sendDocument };
