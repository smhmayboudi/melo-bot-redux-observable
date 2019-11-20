import { IInlineQueryResultArticle } from "./iInlineQueryResultArticle";
import { IInlineQueryResultAudio } from "./iInlineQueryResultAudio";
import { IInlineQueryResultCachedAudio } from "./iInlineQueryResultCachedAudio";
import { IInlineQueryResultCachedDocument } from "./iInlineQueryResultCachedDocument";
import { IInlineQueryResultCachedGif } from "./iInlineQueryResultCachedGif";
import { IInlineQueryResultCachedMpeg4Gif } from "./iInlineQueryResultCachedMpeg4Gif";
import { IInlineQueryResultCachedPhoto } from "./iInlineQueryResultCachedPhoto";
import { IInlineQueryResultCachedSticker } from "./iInlineQueryResultCachedSticker";
import { IInlineQueryResultCachedVideo } from "./iInlineQueryResultCachedVideo";
import { IInlineQueryResultCachedVoice } from "./iInlineQueryResultCachedVoice";
import { IInlineQueryResultContact } from "./iInlineQueryResultContact";
import { IInlineQueryResultDocument } from "./iInlineQueryResultDocument";
import { IInlineQueryResultGame } from "./iInlineQueryResultGame";
import { IInlineQueryResultGif } from "./iInlineQueryResultGif";
import { IInlineQueryResultLocation } from "./iInlineQueryResultLocation";
import { IInlineQueryResultMpeg4Gif } from "./iInlineQueryResultMpeg4Gif";
import { IInlineQueryResultPhoto } from "./iInlineQueryResultPhoto";
import { IInlineQueryResultVenue } from "./iInlineQueryResultVenue";
import { IInlineQueryResultVideo } from "./iInlineQueryResultVideo";
import { IInlineQueryResultVoice } from "./iInlineQueryResultVoice";

export interface AnswerInlineQuery {
  (
    inline_query_id: string,
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
    >,
    cache_time?: number,
    is_personal?: boolean,
    next_offset?: string,
    switch_pm_parameter?: string,
    switch_pm_text?: string
  ): boolean;
}
