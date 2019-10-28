import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionExportChatInviteLink } from "../../types/iActionExportChatInviteLink";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const exportChatInviteLink: (
  action$: Observable<IActionExportChatInviteLink>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionExportChatInviteLink> = (
  action$: Observable<IActionExportChatInviteLink>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionExportChatInviteLink> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionExportChatInviteLink
  ) => Observable<IActionExportChatInviteLink> = (
    action: IActionExportChatInviteLink
  ): Observable<IActionExportChatInviteLink> => {
    if (botToken === undefined) {
      return of(
        actions.exportChatInviteLink.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.exportChatInviteLink.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.exportChatInviteLink.query === undefined) {
      return of(
        actions.exportChatInviteLink.error({
          error: new Error(texts.actionExportChatInviteLinkQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/exportChatInviteLink`
      },
      action.exportChatInviteLink.query
    ).pipe(
      map(
        (response: IResponse): IActionExportChatInviteLink => {
          if (response.ok) {
            return actions.exportChatInviteLink.result({
              result: response.result as string
            });
          }

          return actions.exportChatInviteLink.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.exportChatInviteLink.error({
            error
          })
        )
      )
    );
  };

  return action$.pipe(
    ofType(actions.exportChatInviteLink.EXPORT_CHAT_INVITE_LINK_QUERY),
    switchMap(actionObservable)
  );
};

export { exportChatInviteLink };
