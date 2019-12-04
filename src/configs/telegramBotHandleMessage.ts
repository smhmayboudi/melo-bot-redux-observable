import debug from "debug";
import * as fs from "fs";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { ICommandDownloadOptions } from "../../types/iCommandDownloadOptions";
import { ICommandRelatedToVideoIdOptions } from "../../types/iCommandRelatedToVideoIdOptions";
// import { ICommandShortenListOptions } from "../../types/iCommandShortenListOptions";
import { ICommandShortenResetOptions } from "../../types/iCommandShortenResetOptions";
import { ICommandStartOptions } from "../../types/iCommandStartOptions";
import { ICommandStartGroupOptions } from "../../types/iCommandStartGroupOptions";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as command from "../utils/command";
import * as commandStart from "../utils/commandStart";
import { caption } from "../utils/string";
import * as env from "./env";
import * as texts from "./texts";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleMessage: (
  store: Store<IState, IAction>,
  message: IMessage
) => void = (store: Store<IState, IAction>, message: IMessage): void => {
  appDebug("TELEGRAM_BOT_HANDLE_MESSAGE");
  switch (message.text) {
    case "/addStickerToSet":
      // TODO: check it
      store.dispatch(
        actions.addStickerToSet.query({
          query: {
            emojis: "small",
            // mask_position?: IMaskPosition,
            name: "small",
            png_sticker: fs.createReadStream("./asset/small.png"),
            user_id: message.chat.id
          }
        })
      );
      break;
    case "/createNewStickerSet":
      // TODO: check it
      store.dispatch(
        actions.createNewStickerSet.query({
          query: {
            contains_masks: true,
            emojis: "SMALL",
            // mask_position?: IMaskPosition,.
            name: "small",
            png_sticker: fs.createReadStream("./asset/small.png"),
            title: "small",
            user_id: message.chat.id
          }
        })
      );
      break;
    case "/getChatMember":
      store.dispatch(
        actions.getChatMember.query({
          query: {
            chat_id: `@${env.CHANNEL}`,
            user_id: message.chat.id
          }
        })
      );
      break;
    case "/sendAnimation":
      store.dispatch(
        actions.sendAnimation.query({
          query: {
            animation: fs.createReadStream("./asset/small.gif"),
            caption: caption(""),
            chat_id: message.chat.id,
            disable_notification: true,
            duration: 6,
            height: 320,
            parse_mode: "HTML",
            reply_to_message_id: message.message_id,
            thumb: fs.createReadStream("./asset/small.jpg"),
            width: 560
          }
        })
      );
      break;
    case "/sendAudio":
      store.dispatch(
        actions.sendAudio.query({
          query: {
            audio: fs.createReadStream("./asset/small.mp3"),
            caption: caption(""),
            chat_id: message.chat.id,
            disable_notification: true,
            duration: 6,
            parse_mode: "HTML",
            performer: "small",
            reply_to_message_id: message.message_id,
            thumb: fs.createReadStream("./asset/small.jpg"),
            title: "small"
          }
        })
      );
      break;
    case "/sendDocument":
      store.dispatch(
        actions.sendDocument.query({
          query: {
            caption: caption("small"),
            chat_id: message.chat.id,
            disable_notification: true,
            document: fs.createReadStream("./asset/small.pdf"),
            parse_mode: "HTML",
            reply_to_message_id: message.message_id,
            thumb: fs.createReadStream("./asset/small.jpg")
          }
        })
      );
      break;
    case "/sendMediaGroup":
      // TODO: check it
      store.dispatch(
        actions.sendMediaGroup.query({
          query: {
            chat_id: message.chat.id,
            disable_notification: true,
            media: [
              {
                caption: caption(""),
                media: fs.createReadStream("./asset/small.jpg"),
                parse_mode: "HTML",
                type: "photo"
              },
              {
                caption: caption(""),
                duration: 6,
                height: 320,
                media: fs.createReadStream("./asset/small.mp4"),
                parse_mode: "HTML",
                supports_streaming: true,
                thumb: fs.createReadStream("./asset/small.jpg"),
                type: "video",
                width: 560
              }
            ],
            reply_to_message_id: message.message_id
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
            reply_to_message_id: message.message_id,
            text: caption("small")
          }
        })
      );
      break;
    case "/sendPhoto":
      store.dispatch(
        actions.sendPhoto.query({
          query: {
            caption: caption("small"),
            chat_id: message.chat.id,
            disable_notification: true,
            parse_mode: "HTML",
            photo: fs.createReadStream("./asset/small.jpg"),
            reply_to_message_id: message.message_id
          }
        })
      );
      break;
    case "/sendSticker":
      // TODO: check it
      store.dispatch(
        actions.sendSticker.query({
          query: {
            chat_id: message.chat.id,
            disable_notification: true,
            reply_to_message_id: message.message_id,
            sticker: fs.createReadStream("./asset/small.png")
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
            reply_to_message_id: message.message_id,
            supports_streaming: true,
            thumb: fs.createReadStream("./asset/small.jpg"),
            video: fs.createReadStream("./asset/small.mp4"),
            width: 560
          }
        })
      );
      break;
    case "/sendVideoNote":
      store.dispatch(
        actions.sendVideoNote.query({
          query: {
            chat_id: message.chat.id,
            disable_notification: true,
            duration: 61,
            reply_to_message_id: message.message_id,
            thumb: fs.createReadStream("./asset/small2.jpg"),
            video_note: fs.createReadStream("./asset/small2.mp4")
          }
        })
      );
      break;
    case "/sendVoice":
      store.dispatch(
        actions.sendVoice.query({
          query: {
            caption: caption("small"),
            chat_id: message.chat.id,
            disable_notification: true,
            duration: 6,
            parse_mode: "HTML",
            reply_to_message_id: message.message_id,
            voice: fs.createReadStream("./asset/small.ogg")
          }
        })
      );
      break;
    case "/youtubeDownload":
      store.dispatch(
        actions.youtubeDownload.query({
          query: {
            // TODO: check it
            id: "/dl aWQ9RTB5eGxxZlhmRVk=" // id=E0yxlqfXfEY
          }
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
            q: "small",
            regionCode: env.GOOGLE_API_REGION_CODE,
            relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
            safeSearch: env.GOOGLE_API_SAFE_SEARCH,
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
            hl: env.GOOGLE_API_RELEVANCE_LANGUAGE,
            key: env.GOOGLE_API_KEY,
            maxResults: 1,
            part: "id,snippet",
            regionCode: env.GOOGLE_API_REGION_CODE
          }
        })
      );
      break;
    default:
      if (message.text !== undefined) {
        if (message.text.includes(command.download())) {
          const options: ICommandDownloadOptions | undefined = command.parse<
            ICommandDownloadOptions
          >(message.text, "iCommandDownloadOptions").options;
          if (options !== undefined) {
            store.dispatch(
              actions.youtubeDownload.query({
                query: {
                  id: options.id
                }
              })
            );
          }
        } else if (message.text.includes(command.help())) {
          // TODO: check it
          store.dispatch(
            actions.sendMessage.query({
              query: {
                chat_id: message.chat.id,
                disable_notification: true,
                disable_web_page_preview: true,
                parse_mode: "HTML",
                reply_to_message_id: message.message_id,
                text: texts.messageHelp
              }
            })
          );
        } else if (message.text.includes(command.mostPopular())) {
          store.dispatch(
            actions.youtubeVideoList.query({
              query: {
                chart: "mostPopular",
                hl: env.GOOGLE_API_RELEVANCE_LANGUAGE,
                key: env.GOOGLE_API_KEY,
                maxResults: 1,
                part: "id,snippet",
                regionCode: env.GOOGLE_API_REGION_CODE
              }
            })
          );
        } else if (message.text.includes(command.relatedToVideoId())) {
          const options:
            | ICommandRelatedToVideoIdOptions
            | undefined = command.parse<ICommandRelatedToVideoIdOptions>(
            message.text,
            "iCommandRelatedToVideoIdOptions"
          ).options;
          if (options !== undefined) {
            store.dispatch(
              actions.youtubeSearchList.query({
                query: {
                  key: env.GOOGLE_API_KEY,
                  maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
                  part: "id,snippet",
                  regionCode: env.GOOGLE_API_REGION_CODE,
                  relatedToVideoId: options.id,
                  relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
                  safeSearch: env.GOOGLE_API_SAFE_SEARCH,
                  type: env.GOOGLE_API_SEARCH_LIST_TYPE
                }
              })
            );
          }
        } else if (message.text.includes(command.setInlineGeo())) {
          // TODO: check it
          store.dispatch(
            actions.sendMessage.query({
              query: {
                chat_id: message.chat.id,
                disable_notification: true,
                disable_web_page_preview: true,
                parse_mode: "HTML",
                reply_to_message_id: message.message_id,
                text: texts.messageSetInlineGeo
              }
            })
          );
        } else if (message.text.includes(command.settings())) {
          // TODO: check it
          store.dispatch(
            actions.sendMessage.query({
              query: {
                chat_id: message.chat.id,
                disable_notification: true,
                disable_web_page_preview: true,
                parse_mode: "HTML",
                reply_to_message_id: message.message_id,
                text: texts.messageSettings
              }
            })
          );
        } else if (message.text.includes(command.shortenList())) {
          store.dispatch(
            actions.shortenList.query({
              query: {
                shortLink: message.text
                  .replace(command.shortenList(), "")
                  .trim()
              }
            })
          );
          // const options: ICommandShortenListOptions | undefined = command.parse<
          //   ICommandShortenListOptions
          // >(message.text, "iCommandShortenListOptions").options;
          // if (options !== undefined) {
          //   store.dispatch(
          //     actions.shortenList.query({
          //       query: {
          //         sl: options.shortLink
          //       }
          //     })
          //   );
          // } else {
          //   store.dispatch(
          //     actions.shortenList.query({
          //       query: {}
          //     })
          //   );
          // }
        } else if (message.text.includes(command.shortenReset())) {
          const options:
            | ICommandShortenResetOptions
            | undefined = command.parse<ICommandShortenResetOptions>(
            message.text,
            "iCommandShortenResetOptions"
          ).options;
          if (options !== undefined) {
            store.dispatch(
              actions.shortenReset.query({
                query: {
                  id: options.id
                }
              })
            );
          }
        } else if (message.text.includes(command.start())) {
          const options: ICommandStartOptions | undefined = commandStart.parse<
            ICommandStartOptions
          >(message.text, "iCommandStartOptions").options;
          if (options !== undefined) {
            store.dispatch(
              actions.message.query({
                query: {
                  message: { ...message, text: options.cmd },
                  update_id: 0
                }
              })
            );
            handleMessage(store, { ...message, text: options.cmd });
          }
        } else if (message.text.includes(command.startGroup())) {
          const options:
            | ICommandStartGroupOptions
            | undefined = commandStart.parse<ICommandStartGroupOptions>(
            message.text,
            "iCommandStartGroupOptions"
          ).options;
          if (options !== undefined) {
            store.dispatch(
              actions.message.query({
                query: {
                  message: { ...message, text: options.cmd },
                  update_id: 0
                }
              })
            );
            handleMessage(store, { ...message, text: options.cmd });
          }
        } else {
          store.dispatch(
            actions.youtubeSearchList.query({
              query: {
                key: env.GOOGLE_API_KEY,
                maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
                part: "id,snippet",
                q: message.text.trim(),
                regionCode: env.GOOGLE_API_REGION_CODE,
                relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
                safeSearch: env.GOOGLE_API_SAFE_SEARCH,
                type: env.GOOGLE_API_SEARCH_LIST_TYPE
              }
            })
          );
        }
      }
  }
};

export { handleMessage };
