export interface answerCallbackQuery {
  (
    callback_query_id: string,
    cache_time?: number,
    show_alert?: boolean,
    text?: string,
    url?: string,
  ): boolean
}