import { IInlineQueryResult } from "./iInlineQueryResult";

export interface answerInlineQuery {
  (
    inline_query_id: string,
    results: IInlineQueryResult[],
    cache_time?: number,
    is_personal?: boolean,
    next_offset?: string,
    switch_pm_parameter?: string,
    switch_pm_text?: string,
  ): boolean
}