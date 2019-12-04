import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { transformShortenList } from "../utils/string";
import { IActionSendMessage } from "../../types/iActionSendMessage";
import { IActionShortenList } from "../../types/iActionShortenList";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const shortenListToSendMessage: (
  action$: Observable<IActionShortenList>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionSendMessage | IActionShortenList> = (
  action$: Observable<IActionShortenList>,
  state$: StateObservable<IState> | undefined,
  _dependencies: IDependencies
): Observable<IActionSendMessage | IActionShortenList> => {
  const actionObservable: (
    action: IActionShortenList
  ) => Observable<IActionSendMessage | IActionShortenList> = (
    action: IActionShortenList
  ): Observable<IActionSendMessage | IActionShortenList> => {
    if (state$ === undefined) {
      return of(
        actions.shortenList.error({
          error: new Error(texts.state$Undefined)
        })
      );
    }
    if (state$.value.message.query === undefined) {
      return of(
        actions.shortenList.error({
          error: new Error(texts.state$ValueMessageQueryUndefined)
        })
      );
    }
    if (state$.value.message.query.message === undefined) {
      return of(
        actions.shortenList.error({
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
          text: transformShortenList(action.shortenList.result)
        }
      })
    );
  };

  return action$.pipe(
    ofType(actions.shortenList.SHORTEN_LIST_RESULT),
    switchMap(actionObservable)
  );
};

export { shortenListToSendMessage };
