import debug from "debug";
import * as fs from "fs";
import { Store } from "redux";

import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import { caption } from "../utils/string";

import * as env from "./env";
import * as texts from "./texts";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleMessage: (
  store: Store<IState> & { dispatch: {} },
  message: IMessage
) => void = (
  store: Store<IState> & { dispatch: {} },
  message: IMessage
): void => {
  appDebug("telegramBot:handleMessage");
  switch (message.text) {
    case "/getChatMember":
      store.dispatch(
        actions.getChatMember.query({
          query: {
            chat_id: "@melodio",
            user_id: message.chat.id
          }
        })
      );
      break;
    case "/literate":
      store.dispatch(
        actions.literate.query({
          query: "HI"
        })
      );
      break;
    case "/sendAudio":
      store.dispatch(
        actions.sendAudio.query({
          query: {
            audio: fs.createReadStream("./asset/small.mp3"),
            caption: caption(),
            chat_id: message.chat.id,
            disable_notification: true,
            duration: 6,
            parse_mode: "HTML",
            performer: "small",
            reply_markup: { remove_keyboard: true },
            reply_to_message_id: message.message_id,
            thumb: fs.createReadStream("./asset/small.jpg"),
            title: "small"
          }
        })
      );
      break;
    case "/sendMessage":
      store.dispatch(
        actions.sendMessage.query({
          query: {
            chat_id: message.chat.id,
            disable_notification: true,
            disable_web_page_preview: true,
            parse_mode: "HTML",
            reply_markup: { remove_keyboard: true },
            reply_to_message_id: message.message_id,
            text: texts.messageStart
          }
        })
      );
      break;
    case "/sendVideo":
      store.dispatch(
        actions.sendVideo.query({
          query: {
            caption: caption("small"),
            chat_id: message.chat.id,
            disable_notification: true,
            duration: 6,
            height: 320,
            parse_mode: "HTML",
            reply_markup: { remove_keyboard: true },
            reply_to_message_id: message.message_id,
            supports_streaming: true,
            thumb: fs.createReadStream("./asset/small.jpg"),
            video: fs.createReadStream("./asset/small.mp4"),
            width: 560
          }
        })
      );
      break;
    case "/youtubeDownload":
      store.dispatch(
        actions.youtubeDownload.query({
          query: "/dl_RTB5eGxxZlhmRVk".replace("/dl_", "").trim()
        })
      );
      break;
    case "/youtubeSearchList":
      store.dispatch(
        actions.youtubeSearchList.query({
          query: {
            key: env.GOOGLE_API_KEY,
            maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
            part: "id,snippet",
            q: "HI",
            type: env.GOOGLE_API_SEARCH_LIST_TYPE
          }
        })
      );
      break;
    case "/youtubeVideoList":
      store.dispatch(
        actions.youtubeVideoList.query({
          query: {
            chart: "mostPopular",
            key: env.GOOGLE_API_KEY,
            maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
            part: "id,snippet"
          }
        })
      );
      break;
    default:
      if (message.text !== undefined) {
        if (message.text.includes(`/${texts.commandStart}`)) {
          store.dispatch(
            actions.sendMessage.query({
              query: {
                chat_id: message.chat.id,
                disable_notification: true,
                disable_web_page_preview: true,
                parse_mode: "HTML",
                reply_markup: { remove_keyboard: true },
                reply_to_message_id: message.message_id,
                text: texts.messageStart
              }
            })
          );
        } else if (message.text.includes(`/${texts.commandMostPopular}`)) {
          store.dispatch(
            actions.youtubeVideoList.query({
              query: {
                chart: "mostPopular",
                key: env.GOOGLE_API_KEY,
                maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
                part: "id,snippet"
              }
            })
          );
        } else if (
          message.text.includes(
            `/${texts.commandDownload}${texts.commandSeparator}`
          )
        ) {
          store.dispatch(
            actions.youtubeDownload.query({
              query: message.text
                .replace(
                  `/${texts.commandDownload}${texts.commandSeparator}`,
                  ""
                )
                .trim()
            })
          );
        } else if (
          message.text.includes(
            `/${texts.commandRelatedToVideoId}${texts.commandSeparator}`
          )
        ) {
          store.dispatch(
            actions.youtubeSearchList.query({
              query: {
                key: env.GOOGLE_API_KEY,
                relatedToVideoId: message.text
                  .replace(
                    `/${texts.commandRelatedToVideoId}${texts.commandSeparator}`,
                    ""
                  )
                  .trim()
              }
            })
          );
        } else {
          store.dispatch(
            actions.youtubeSearchList.query({
              query: {
                key: env.GOOGLE_API_KEY,
                maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
                part: "id,snippet",
                q: message.text.trim(),
                type: env.GOOGLE_API_SEARCH_LIST_TYPE
              }
            })
          );
        }
      }
  }
};

export { handleMessage };
