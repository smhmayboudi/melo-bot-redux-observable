import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendMediaGroup } from "../../types/iActionSendMediaGroup";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import { transformSendMediaGroupQuery } from "../utils/formData";

const sendMediaGroup: (
  action$: Observable<IActionSendMediaGroup>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendMediaGroup> = (
  action$: Observable<IActionSendMediaGroup>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendMediaGroup> => {
  const {
    authorization,
    botToken,
    locales,
    requestsUploadObservable
  } = dependencies;

  const actionObservable: (
    action: IActionSendMediaGroup
  ) => Observable<IActionSendMediaGroup> = (
    action: IActionSendMediaGroup
  ): Observable<IActionSendMediaGroup> => {
    if (action.sendMediaGroup.query === undefined) {
      return of(
        actions.sendMediaGroup.error({
          error: new Error(locales.find("actionSendMediaGroupQueryUndefined"))
        })
      );
    }

    return requestsUploadObservable<IResponse>(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/sendMediaGroup`
      },
      transformSendMediaGroupQuery(action.sendMediaGroup.query)
    ).pipe(
      map(
        (response: IResponse): IActionSendMediaGroup => {
          if (response.ok) {
            return actions.sendMediaGroup.result({
              result: response.result as IMessage
            });
          }

          return actions.sendMediaGroup.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendMediaGroup.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendMediaGroup.SEND_MEDIA_GROUP_QUERY),
    filterAsync((action: IActionSendMediaGroup, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { sendMediaGroup };
