import * as debug from "debug";
import * as fs from "fs";
import { MongoClient } from "mongodb";
import { Store } from "redux";
import { Observable } from "rxjs";

import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import * as actions from "../actions";
import {
  collectionObservable,
  connectObservable,
  findOneObservable,
  insertOneObservable
} from "../lib/mongodbObservable";
import { requestObservable } from "../lib/requestObservable";
import { requestsObservable } from "../lib/requestsObservable";
import { requestsUploadObservable } from "../lib/requestsUploadObservable";
import { requestUploadObservable } from "../lib/requestUploadObservable";
import { youtubeDownloadObservable } from "../lib/youtubeDownloadObservable";
import { caption } from "../utils/string";

import * as env from "./env";
import { configureStore } from "./store";
import * as texts from "./texts";

const appDebug: debug.IDebugger = debug("app:config:telegramBot");

const operate: (message: IStateMessageQuery) => void = (
  message: IStateMessageQuery
): void => {
  const mongoClientObservable: () => Observable<MongoClient> = (): Observable<
    MongoClient
  > =>
    connectObservable("mongodb://localhost:27017", {
      appname: "telegramBot",
      logger: appDebug,
      loggerLevel: "info",
      useNewUrlParser: true
    });
  if (message.message !== undefined) {
    const store: Store<IState> & { dispatch: {} } = configureStore({
      botToken: env.BOT_TOKEN,
      collectionObservable,
      findOneObservable,
      insertOneObservable,
      mongoClientObservable,
      requestObservable,
      requestUploadObservable,
      requestsObservable,
      requestsUploadObservable,
      youtubeDownloadObservable
    });
    store.dispatch(actions.message.query({ query: message }));
    switch (message.message.text) {
      // TODO: TEST
      case "/getChatMember":
        store.dispatch(
          actions.getChatMember.query({
            query: {
              chat_id: "@melodio",
              user_id: message.message.chat.id
            }
          })
        );
        break;
      // TODO: TEST
      case "/literate":
        store.dispatch(
          actions.literate.query({
            query: "HI"
          })
        );
        break;
      // TODO: TEST
      case "/sendAudio":
        store.dispatch(
          actions.sendAudio.query({
            query: {
              audio: fs.createReadStream("./asset/small.mp3"),
              caption: caption(),
              chat_id: message.message.chat.id,
              disable_notification: true,
              duration: 6,
              parse_mode: "HTML",
              performer: "small",
              reply_markup: { remove_keyboard: true },
              reply_to_message_id: message.message.message_id,
              thumb: fs.createReadStream("./asset/small.jpg"),
              title: "small"
            }
          })
        );
        break;
      // TODO: TEST
      case "/sendMessage":
        store.dispatch(
          actions.sendMessage.query({
            query: {
              chat_id: message.message.chat.id,
              disable_notification: true,
              disable_web_page_preview: true,
              parse_mode: "HTML",
              reply_markup: { remove_keyboard: true },
              reply_to_message_id: message.message.message_id,
              text: texts.messageStart
            }
          })
        );
        break;
      // TODO: TEST
      case "/sendVideo":
        store.dispatch(
          actions.sendVideo.query({
            query: {
              caption: caption("small"),
              chat_id: message.message.chat.id,
              disable_notification: true,
              duration: 6,
              height: 320,
              parse_mode: "HTML",
              reply_markup: { remove_keyboard: true },
              reply_to_message_id: message.message.message_id,
              supports_streaming: true,
              thumb: fs.createReadStream("./asset/small.jpg"),
              video: fs.createReadStream("./asset/small.mp4"),
              width: 560
            }
          })
        );
        break;
      // TODO: TEST
      case "/youtubeDownload":
        store.dispatch(
          actions.youtubeDownload.query({
            query: "/dl_RTB5eGxxZlhmRVk".replace("/dl_", "").trim()
          })
        );
        break;
      // TODO: TEST
      case "/youtubeSearchList":
        store.dispatch(
          actions.youtubeSearchList.query({
            query: {
              key: env.KEY,
              maxResults: 10,
              part: "id,snippet",
              q: "HI"
            }
          })
        );
        break;
      // TODO: TEST
      case "/youtubeVideoList":
        store.dispatch(
          actions.youtubeVideoList.query({
            query: {
              chart: "mostPopular",
              key: env.KEY,
              maxResults: 10,
              part: "id,snippet"
            }
          })
        );
        break;
      // TODO: APP
      default:
        if (message.message.text !== undefined) {
          if (message.message.text.includes(`/${texts.commandStart}`)) {
            store.dispatch(
              actions.sendMessage.query({
                query: {
                  chat_id: message.message.chat.id,
                  disable_notification: true,
                  disable_web_page_preview: true,
                  parse_mode: "HTML",
                  reply_markup: { remove_keyboard: true },
                  reply_to_message_id: message.message.message_id,
                  text: texts.messageStart
                }
              })
            );
          } else if (
            message.message.text.includes(`/${texts.commandMostPopular}`)
          ) {
            store.dispatch(
              actions.youtubeVideoList.query({
                query: {
                  chart: "mostPopular",
                  key: env.KEY,
                  maxResults: 10,
                  part: "id,snippet"
                }
              })
            );
          } else if (
            message.message.text.includes(
              `/${texts.commandDownload}${texts.commandSeparator}`
            )
          ) {
            store.dispatch(
              actions.youtubeDownload.query({
                query: message.message.text
                  .replace(
                    `/${texts.commandDownload}${texts.commandSeparator}`,
                    ""
                  )
                  .trim()
              })
            );
          } else if (
            message.message.text.includes(
              `/${texts.commandRelatedToVideoId}${texts.commandSeparator}`
            )
          ) {
            store.dispatch(
              actions.youtubeSearchList.query({
                query: {
                  key: env.KEY,
                  relatedToVideoId: message.message.text
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
                  key: env.KEY,
                  // Location: "32.4279,53.6880",
                  // LocationRadius: "1000km",
                  maxResults: 10,
                  part: "id,snippet",
                  q: message.message.text.trim(),
                  // RegionCode: "US",
                  // RelevanceLanguage: "fa",
                  type: "video"
                  // VideoCategoryId: "10",
                }
              })
            );
          }
        }
    }
  }
};

export { operate };
