import { ofType, StateObservable } from "redux-observable";
import { iif, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IDependencies } from "../../types/iDependencies";
import { IResponse } from "../../types/iResponse";
import { IState } from "../../types/iState";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as actions from "../actions";
import * as texts from "../configs/texts";
import { actionGetChatMemberResultStatus } from "../utils/boolean";

const getChatMember: (
  action$: Observable<IActionGetChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionGetChatMember | IActionSendMessage> = (
  action$: Observable<IActionGetChatMember>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionGetChatMember | IActionSendMessage> => {
  const { botToken, requestsObservable } = dependencies;

  const actionObservable: (
    action: IActionGetChatMember
  ) => Observable<IActionGetChatMember> = (
    action: IActionGetChatMember
  ): Observable<IActionGetChatMember> => {
    if (botToken === undefined) {
      return of(
        actions.getChatMember.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (requestsObservable === undefined) {
      return of(
        actions.getChatMember.error({
          error: new Error(texts.epicDependencyRequestsObservableUndefined)
        })
      );
    }
    if (action.getChatMember.query === undefined) {
      return of(
        actions.getChatMember.error({
          error: new Error(texts.actionGetChatMemberQueryUndefined)
        })
      );
    }

    return requestsObservable(
      {
        host: "api.telegram.org",
        method: "POST",
        path: `/bot${botToken}/getChatMember`
      },
      action.getChatMember.query
    ).pipe(
      map(
        (response: IResponse): IActionGetChatMember => {
          if (response.ok) {
            return actions.getChatMember.result({
              result: response.result as IChatMember
            });
          }

          return actions.getChatMember.error({
            error: response
          });
        }
      ),
      catchError((error: any) =>
        of(
          actions.getChatMember.error({
            error
          })
        )
      )
    );
  };

  const transformObservable: (
    action: IActionGetChatMember
  ) => Observable<IActionGetChatMember | IActionSendMessage> = (
    action: IActionGetChatMember
  ): Observable<IActionGetChatMember | IActionSendMessage> => {
    if (action.type === actions.getChatMember.GET_CHAT_MEMBER_ERROR) {
      return of(action);
    }
    if (state$ === undefined) {
      return of(
        actions.getChatMember.error({
          error: new Error(texts.state$Undefined)
        })
      );
    }
    if (state$.value.message.query === undefined) {
      return of(
        actions.getChatMember.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      );
    }
    if (state$.value.message.query.message === undefined) {
      return of(
        actions.getChatMember.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        })
      );
    }

    return of(
      actions.sendMessage.query({
        query: {
          chat_id: state$.value.message.query.message.chat.id,
          disable_notification: true,
          disable_web_page_preview: true,
          parse_mode: "HTML",
          reply_to_message_id: state$.value.message.query.message.message_id,
          text: texts.messageJoin
        }
      })
    );
  };

  return action$.pipe(
    ofType(actions.getChatMember.GET_CHAT_MEMBER_QUERY),
    switchMap(actionObservable),
    switchMap((value: IActionGetChatMember) =>
      iif(
        () => actionGetChatMemberResultStatus(value),
        of(value),
        transformObservable(value)
      )
    )
  );
};

export { getChatMember };
