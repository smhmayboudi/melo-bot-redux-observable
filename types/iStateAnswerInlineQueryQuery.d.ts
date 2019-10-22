import { IInlineQueryResult } from "./telegramBot/inlineMode/iInlineQueryResult";
import { IInlineQueryResultArticle } from "./telegramBot/inlineMode/iInlineQueryResultArticle";
import { IInlineQueryResultAudio } from "./telegramBot/inlineMode/iInlineQueryResultAudio";
import { IInlineQueryResultCachedAudio } from "./telegramBot/inlineMode/iInlineQueryResultCachedAudio";
import { IInlineQueryResultCachedDocument } from "./telegramBot/inlineMode/iInlineQueryResultCachedDocument";
import { IInlineQueryResultCachedGif } from "./telegramBot/inlineMode/iInlineQueryResultCachedGif";
import { IInlineQueryResultCachedMpeg4Gif } from "./telegramBot/inlineMode/iInlineQueryResultCachedMpeg4Gif";
import { IInlineQueryResultCachedPhoto } from "./telegramBot/inlineMode/iInlineQueryResultCachedPhoto";
import { IInlineQueryResultCachedSticker } from "./telegramBot/inlineMode/iInlineQueryResultCachedSticker";
import { IInlineQueryResultCachedVideo } from "./telegramBot/inlineMode/iInlineQueryResultCachedVideo";
import { IInlineQueryResultCachedVoice } from "./telegramBot/inlineMode/iInlineQueryResultCachedVoice";
import { IInlineQueryResultContact } from "./telegramBot/inlineMode/iInlineQueryResultContact";
import { IInlineQueryResultDocument } from "./telegramBot/inlineMode/iInlineQueryResultDocument";
import { IInlineQueryResultGame } from "./telegramBot/inlineMode/iInlineQueryResultGame";
import { IInlineQueryResultGif } from "./telegramBot/inlineMode/iInlineQueryResultGif";
import { IInlineQueryResultLocation } from "./telegramBot/inlineMode/iInlineQueryResultLocation";
import { IInlineQueryResultMpeg4Gif } from "./telegramBot/inlineMode/iInlineQueryResultMpeg4Gif";
import { IInlineQueryResultPhoto } from "./telegramBot/inlineMode/iInlineQueryResultPhoto";
import { IInlineQueryResultVenue } from "./telegramBot/inlineMode/iInlineQueryResultVenue";
import { IInlineQueryResultVideo } from "./telegramBot/inlineMode/iInlineQueryResultVideo";
import { IInlineQueryResultVoice } from "./telegramBot/inlineMode/iInlineQueryResultVoice";

export interface IStateAnswerInlineQueryQuery {
  cache_time?: number;
  inline_query_id: string;
  is_personal?: boolean;
  next_offset?: string;
  results: Array<
    | IInlineQueryResultArticle
    | IInlineQueryResultAudio
    | IInlineQueryResultCachedAudio
    | IInlineQueryResultCachedDocument
    | IInlineQueryResultCachedGif
    | IInlineQueryResultCachedMpeg4Gif
    | IInlineQueryResultCachedPhoto
    | IInlineQueryResultCachedSticker
    | IInlineQueryResultCachedVideo
    | IInlineQueryResultCachedVoice
    | IInlineQueryResultContact
    | IInlineQueryResultDocument
    | IInlineQueryResultGame
    | IInlineQueryResultGif
    | IInlineQueryResultLocation
    | IInlineQueryResultMpeg4Gif
    | IInlineQueryResultPhoto
    | IInlineQueryResultVenue
    | IInlineQueryResultVideo
    | IInlineQueryResultVoice
  >;
  switch_pm_parameter?: string;
  switch_pm_text?: string;
}
