import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionSendVideo } from "../../types/iActionSendVideo";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";
import { transformSendVideoQuery } from "../utils/formData";

const sendVideo: (
  action$: Observable<IActionSendVideo>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendVideo> = (
  action$: Observable<IActionSendVideo>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendVideo> => {
  const {
    authorization,
    botToken,
    locales,
    requestsUploadObservable
  } = dependencies;

  const actionObservable: (
    action: IActionSendVideo
  ) => Observable<IActionSendVideo> = (
    action: IActionSendVideo
  ): Observable<IActionSendVideo> => {
    if (action.sendVideo.query === undefined) {
      return of(
        actions.sendVideo.error({
          error: new Error(locales.find("actionSendVideoQueryUndefined"))
        })
      );
    }

    return requestsUploadObservable<IResponse>(
      {
        host: "api.telegram.org",
        path: `/bot${botToken}/sendVideo`
      },
      transformSendVideoQuery(action.sendVideo.query)
    ).pipe(
      map(
        (response: IResponse): IActionSendVideo => {
          if (response.ok) {
            return actions.sendVideo.result({
              result: response.result as IMessage
            });
          }

          return actions.sendVideo.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.sendVideo.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.sendVideo.SEND_VIDEO_QUERY),
    filterAsync((action: IActionSendVideo, index: number) =>
      authorization(action, state$, index)
    ),
    switchMap(actionObservable)
  );
};

export { sendVideo };
