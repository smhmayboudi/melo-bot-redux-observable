import { youtube_v3 } from "googleapis";

import { IInlineQueryResultArticle } from "../../types/telegramBot/inlineMode/iInlineQueryResultArticle";
import * as texts from "../configs/texts";

import { encode } from "./string";

const transformSearchResults: (
  items?: youtube_v3.Schema$SearchResult[],
  q?: string
) => IInlineQueryResultArticle[] = (
  items?: youtube_v3.Schema$SearchResult[],
  _q?: string
): IInlineQueryResultArticle[] => {
  const res: IInlineQueryResultArticle[] = [];
  if (items !== undefined) {
    if (items.length === 0) {
      return [];
    }
    for (const value of items) {
      if (
        value.id !== undefined &&
        value.id.videoId !== null &&
        value.id.videoId !== undefined &&
        value.snippet !== undefined &&
        value.snippet.description !== null &&
        value.snippet.description !== undefined &&
        value.snippet.thumbnails !== undefined &&
        value.snippet.thumbnails.default !== undefined &&
        value.snippet.thumbnails.default.height !== null &&
        value.snippet.thumbnails.default.height !== undefined &&
        value.snippet.thumbnails.default.url !== null &&
        value.snippet.thumbnails.default.url !== undefined &&
        value.snippet.thumbnails.default.width !== null &&
        value.snippet.thumbnails.default.width !== undefined &&
        value.snippet.title !== null &&
        value.snippet.title !== undefined
      ) {
        const videoId: string = encode(value.id.videoId);
        res.push({
          description: value.snippet.description,
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
                  callback_data: "callback_data:OK",
                  text: "OK"
                },
                {
                  callback_data: "callback_data:NOK",
                  text: "NOK"
                }
              ]
            ]
          },
          thumb_height: value.snippet.thumbnails.default.height,
          thumb_url: value.snippet.thumbnails.default.url,
          thumb_width: value.snippet.thumbnails.default.width,
          title: value.snippet.title,
          type: "article"
        });
      }
    }
  }

  return res;
};

const transformVideos: (
  items: youtube_v3.Schema$Video[],
  chart: string
) => IInlineQueryResultArticle[] = (
  items: youtube_v3.Schema$Video[],
  _chart: string
): IInlineQueryResultArticle[] => {
  if (items.length === 0) {
    return [];
  }
  const res: IInlineQueryResultArticle[] = [];
  for (const value of items) {
    if (
      value.id !== null &&
      value.id !== undefined &&
      value.snippet !== undefined &&
      value.snippet.description !== null &&
      value.snippet.description !== undefined &&
      value.snippet.thumbnails !== undefined &&
      value.snippet.thumbnails.default !== undefined &&
      value.snippet.thumbnails.default.height !== null &&
      value.snippet.thumbnails.default.height !== undefined &&
      value.snippet.thumbnails.default.url !== null &&
      value.snippet.thumbnails.default.url !== undefined &&
      value.snippet.thumbnails.default.width !== null &&
      value.snippet.thumbnails.default.width !== undefined &&
      value.snippet.title !== null &&
      value.snippet.title !== undefined
    ) {
      const videoId: string = encode(value.id);
      res.push({
        description: value.snippet.description,
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
                callback_data: "callback_data:OK",
                text: "OK"
              },
              {
                callback_data: "callback_data:NOK",
                text: "NOK"
              }
            ]
          ]
        },
        thumb_height: value.snippet.thumbnails.default.height,
        thumb_url: value.snippet.thumbnails.default.url,
        thumb_width: value.snippet.thumbnails.default.width,
        title: value.snippet.title,
        type: "article"
      });
    }
  }

  return res;
};

export { transformSearchResults, transformVideos };
