import { youtube_v3 } from "googleapis";

import { IInlineQueryResultArticle } from "../../types/telegramBot/inlineMode/iInlineQueryResultArticle";
import * as texts from "../config/texts";

import { encode } from "./string";

const transformSearchList: (
  items: youtube_v3.Schema$SearchResult[],
  q: string
) => IInlineQueryResultArticle[] = (
  items: youtube_v3.Schema$SearchResult[],
  _q: string
): IInlineQueryResultArticle[] => {
  if (items.length === 0) {
    return [];
  }
  const res: IInlineQueryResultArticle[] = [];
  for (const value of items) {
    if (
      value.id !== undefined &&
      value.id.videoId !== undefined &&
      value.snippet !== undefined &&
      value.snippet.thumbnails !== undefined &&
      value.snippet.thumbnails.default !== undefined &&
      value.snippet.title !== undefined
    ) {
      const videoId: string = encode(value.id.videoId as string);
      res.push({
        description: value.snippet.description as string,
        hide_url: false,
        id: videoId,
        input_message_content: {
          disable_web_page_preview: true,
          message_text: `/${texts.commandDownload}${texts.commandSeparator}${videoId}`,
          parse_mode: "HTML"
        },
        reply_markup: {
          inline_keyboard: [
            [
              {
                // TODO: callback_data?: string,
                // TODO: callback_game?: ICallbackGame,
                login_url: {
                  // TODO: bot_username?: string,
                  // TODO: forward_text?: string,
                  // TODO: request_write_access?: boolean,
                  url: "http://www.melobit.com"
                },
                // TODO: pay?: boolean,
                // TODO: switch_inline_query?: string,
                // TODO: switch_inline_query_current_chat?: string,
                text: "reply_markup:text"
                // TODO: url?: string;
              }
            ]
          ]
        },
        thumb_height: value.snippet.thumbnails.default.height as number,
        thumb_url: value.snippet.thumbnails.default.url as string,
        thumb_width: value.snippet.thumbnails.default.width as number,
        title: value.snippet.title as string,
        type: "article"
      });
    }
  }

  return res;
};

export { transformSearchList };
