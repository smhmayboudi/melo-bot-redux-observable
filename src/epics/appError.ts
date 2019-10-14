import { Action } from "redux";
import { StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { filter, switchMap } from "rxjs/operators";

import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../config/texts";

const appError: (
  action$: Observable<Action<string>>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendMessage> = (
  action$: Observable<Action<string>>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionSendMessage> => {
  const actionObservable: (
    action: Action<string>
  ) => Observable<IActionSendMessage> = (
    action: Action<string>
  ): Observable<IActionSendMessage> => {
    if (state$ === undefined) {
      return of(
        actions.sendMessage.error({
          error: new Error(texts.state$Undefined)
        })
      );
    }
    if (state$.value.message.query === undefined) {
      return of(
        actions.sendMessage.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      );
    }
    if (state$.value.message.query.message === undefined) {
      return of(
        actions.sendMessage.error({
          error: new Error(texts.state$ValueMessageQueryMessageUndefined)
        })
      );
    }

    const chatId: number = state$.value.message.query.message.chat.id;
    const messageId: number = state$.value.message.query.message.message_id;

    return of(
      actions.sendMessage.query({
        query: {
          chat_id: chatId,
          disable_notification: true,
          disable_web_page_preview: true,
          parse_mode: "HTML",
          reply_markup: { remove_keyboard: true },
          reply_to_message_id: messageId,
          text: texts.messageError
        }
      })
    );
  };

  return action$.pipe(
    filter((actionQuery: Action<string>): boolean =>
      actionQuery.type.includes("ERROR")
    ),
    switchMap(actionObservable)
  );
};

export { appError };
