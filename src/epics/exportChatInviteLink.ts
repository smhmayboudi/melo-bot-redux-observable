import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionExportChatInviteLink } from "../../types/iActionExportChatInviteLink";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import { filterAsync } from "../libs/filterAsync";

const exportChatInviteLink: (
  action$: Observable<IActionExportChatInviteLink>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionExportChatInviteLink> = (
  action$: Observable<IActionExportChatInviteLink>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionExportChatInviteLink> => {
  const { authorization, botToken, locales, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionExportChatInviteLink
  ) => Observable<IActionExportChatInviteLink> = (
    action: IActionExportChatInviteLink
  ): Observable<IActionExportChatInviteLink> => {
    if (action.exportChatInviteLink.query === undefined) {
      return of(
        actions.exportChatInviteLink.error({
          error: new Error(
            locales.find("actionExportChatInviteLinkQueryUndefined")
          )
        })
      );
    }

    return requestsObservable<IResponse>(
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
    filterAsync((action: IActionExportChatInviteLink, index: number) =>
      authorization(state$, dependencies, action, index)
    ),
    switchMap(actionObservable)
  );
};

export { exportChatInviteLink };
