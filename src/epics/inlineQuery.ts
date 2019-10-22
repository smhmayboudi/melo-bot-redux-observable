import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { IActionAnswerInlineQuery } from "../../types/iActionAnswerInlineQuery";
import { IActionInlineQuery } from "../../types/iActionInlineQuery";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { IInlineQueryResultArticle } from "../../types/telegramBot/inlineMode/iInlineQueryResultArticle";
import * as actions from "../actions";
import * as texts from "../config/texts";

const inlineQuery: (
  action$: Observable<IActionInlineQuery>,
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => Observable<IActionInlineQuery | IActionAnswerInlineQuery> = (
  action$: Observable<IActionInlineQuery>,
  _state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): Observable<IActionInlineQuery | IActionAnswerInlineQuery> => {
  const { botToken } = dependencies;

  const actionObservable: (
    action: IActionInlineQuery
  ) => Observable<IActionInlineQuery | IActionAnswerInlineQuery> = (
    action: IActionInlineQuery
  ): Observable<IActionInlineQuery | IActionAnswerInlineQuery> => {
    if (botToken === undefined) {
      return of(
        actions.inlineQuery.error({
          error: new Error(texts.epicDependencyBotTokenUndefined)
        })
      );
    }
    if (action.inlineQuery.query === undefined) {
      return of(
        actions.inlineQuery.error({
          error: new Error(texts.actionInlineQueryQueryUndefined)
        })
      );
    }

    const inlineQueryResultArticle: IInlineQueryResultArticle[] = [
      {
        description: "short",
        hide_url: false,
        id: "id",
        input_message_content: {
          disable_web_page_preview: false,
          message_text: "message_text",
          parse_mode: "HTML"
        },
        // Reply_markup?: IInlineKeyboardMarkup,
        thumb_height: 128,
        thumb_url: "https://telegram.org/img/t_logo.png",
        thumb_width: 128,
        title: "title",
        type: "article",
        url: "https://core.telegram.org/bots/api#inlinequeryresultarticle"
      }
    ];

    return of(
      actions.answerInlineQuery.query({
        query: {
          cache_time: 0,
          inline_query_id: action.inlineQuery.query.id,
          is_personal: true,
          next_offset: "",
          results: inlineQueryResultArticle,
          switch_pm_parameter: "string",
          switch_pm_text: texts.epicInlineQueryConnectGoogleAccount
        }
      })
    );
  };

  return action$.pipe(
    ofType(actions.inlineQuery.INLINE_QUERY_QUERY),
    switchMap(actionObservable)
  );
};

export { inlineQuery };
