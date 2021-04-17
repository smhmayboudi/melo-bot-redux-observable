import debug from "debug";
import * as fs from "fs";
import * as path from "path";
import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { ICommand } from "../../types/iCommand";
// import { ICommandShortenListOptions } from "../../types/iCommandShortenListOptions";
import { ICommandShortenResetOptions } from "../../types/iCommandShortenResetOptions";
import { ICommandStartGroupOptions } from "../../types/iCommandStartGroupOptions";
import { ICommandStartOptions } from "../../types/iCommandStartOptions";
import { ICommandYoutubeDownloadOptions } from "../../types/iCommandYoutubeDownloadOptions";
import { ICommandYoutubeSearchListByQOptions } from "../../types/iCommandYoutubeSearchListByQOptions";
import { ICommandYoutubeSearchListByRelatedToVideoIdOptions } from "../../types/iCommandYoutubeSearchListByRelatedToVideoIdOptions";
import { IState } from "../../types/iState";
import { IStateCommandUI } from "../../types/iStateCommandUI";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as command from "../utils/command";
import * as commandStart from "../utils/commandStart";
import { caption, validInput } from "../utils/string";
import * as env from "./env";

const appDebug: debug.IDebugger = debug("app:config:telegramBot:handleMessage");

const handleMessage: (
  store: Store<IState, IAction>,
  message: IMessage
) => void = (store: Store<IState, IAction>, message: IMessage): void => {
  appDebug("TELEGRAM_BOT_HANDLE_MESSAGE");
  const messageText = validInput(message.text);
  switch (messageText) {
    case "/addStickerToSet":
      // TODO: check it
      store.dispatch(
        actions.addStickerToSet.query({
          query: {
            emojis: "small",
            // mask_position?: IMaskPosition,
            name: "small",
            png_sticker: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.png")
            ),
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
            png_sticker: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.png")
            ),
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
            animation: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.gif")
            ),
            caption: caption(""),
            chat_id: message.chat.id,
            disable_notification: true,
            duration: 6,
            height: 320,
            parse_mode: "HTML",
            reply_to_message_id: message.message_id,
            thumb: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.jpg")
            ),
            width: 560
          }
        })
      );
      break;
    case "/sendAudio":
      store.dispatch(
        actions.sendAudio.query({
          query: {
            audio: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.mp3")
            ),
            caption: caption(""),
            chat_id: message.chat.id,
            disable_notification: true,
            duration: 6,
            parse_mode: "HTML",
            performer: "small",
            reply_to_message_id: message.message_id,
            thumb: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.jpg")
            ),
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
            document: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.pddf")
            ),
            parse_mode: "HTML",
            reply_to_message_id: message.message_id,
            thumb: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.jpg")
            )
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
                media: fs.createReadStream(
                  path.resolve(__dirname, "../../asset", "small.jpg")
                ),
                parse_mode: "HTML",
                type: "photo"
              },
              {
                caption: caption(""),
                duration: 6,
                height: 320,
                media: fs.createReadStream(
                  path.resolve(__dirname, "../../asset", "small.mp4")
                ),
                parse_mode: "HTML",
                supports_streaming: true,
                thumb: fs.createReadStream(
                  path.resolve(__dirname, "../../asset", "small.jpg")
                ),
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
            photo: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.jpg")
            ),
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
            sticker: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.png")
            )
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
            thumb: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.jpg")
            ),
            video: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.mp4")
            ),
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
            thumb: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small2.jpg")
            ),
            video_note: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small2.mp4")
            )
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
            voice: fs.createReadStream(
              path.resolve(__dirname, "../../asset", "small.ogg")
            )
          }
        })
      );
      break;
    case "/youtubeDownload":
      store.dispatch(
        actions.youtubeDownload.query({
          query: {
            id: "/dl CgtGa01QdHgyUmtCaw"
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
      if (messageText !== undefined) {
        if (messageText.includes(command.help())) {
          // TODO: check it
          store.dispatch(
            actions.sendMessage.query({
              query: {
                chat_id: message.chat.id,
                disable_notification: true,
                disable_web_page_preview: true,
                parse_mode: "HTML",
                reply_to_message_id: message.message_id,
                text: "messageHelp"
              }
            })
          );
        } else if (messageText.includes(command.setInlineGeo())) {
          // TODO: check it
          store.dispatch(
            actions.sendMessage.query({
              query: {
                chat_id: message.chat.id,
                disable_notification: true,
                disable_web_page_preview: true,
                parse_mode: "HTML",
                reply_to_message_id: message.message_id,
                text: "messageSetInlineGeo"
              }
            })
          );
        } else if (messageText.includes(command.settings())) {
          // TODO: check it
          store.dispatch(
            actions.sendMessage.query({
              query: {
                chat_id: message.chat.id,
                disable_notification: true,
                disable_web_page_preview: true,
                parse_mode: "HTML",
                reply_to_message_id: message.message_id,
                text: "messageSettings"
              }
            })
          );
        } else if (messageText.includes(command.shortenList())) {
          const cmdParts: string[] = command.split(messageText);
          store.dispatch(
            actions.shortenList.query({
              query: {
                shortLink: cmdParts[1]
              }
            })
          );
          // const options: ICommandShortenListOptions | undefined = command.parse<
          //   ICommandShortenListOptions
          // >(messageText, "iCommandShortenListOptions").options;
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
        } else if (messageText.includes(command.shortenReset())) {
          const options:
            | ICommandShortenResetOptions
            | undefined = command.parse<ICommandShortenResetOptions>(
            messageText,
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
        } else if (messageText.includes(command.start())) {
          const options: ICommandStartOptions | undefined = commandStart.parse<
            ICommandStartOptions
          >(messageText, "iCommandStartOptions").options;
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
        } else if (messageText.includes(command.startGroup())) {
          const options:
            | ICommandStartGroupOptions
            | undefined = commandStart.parse<ICommandStartGroupOptions>(
            messageText,
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
        } else if (messageText.includes(command.youtubeDownload())) {
          const options:
            | ICommandYoutubeDownloadOptions
            | undefined = command.parse<ICommandYoutubeDownloadOptions>(
            messageText,
            "iCommandYoutubeDownloadOptions"
          ).options;
          if (options !== undefined) {
            store.dispatch(
              actions.youtubeDownload.query({
                query: {
                  id: options.id
                }
              })
            );
          }
        } else if (messageText.includes(command.youtubeSearchListByQ())) {
          const options:
            | ICommandYoutubeSearchListByQOptions
            | undefined = command.parse<ICommandYoutubeSearchListByQOptions>(
            messageText,
            "iCommandYoutubeSearchListByQOptions"
          ).options;
          if (options !== undefined) {
            store.dispatch(
              actions.youtubeSearchList.query({
                query: {
                  key: env.GOOGLE_API_KEY,
                  maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
                  part: "id,snippet",
                  q: options.q,
                  regionCode: env.GOOGLE_API_REGION_CODE,
                  relevanceLanguage: env.GOOGLE_API_RELEVANCE_LANGUAGE,
                  safeSearch: env.GOOGLE_API_SAFE_SEARCH,
                  type: env.GOOGLE_API_SEARCH_LIST_TYPE
                }
              })
            );
          }
        } else if (
          messageText.includes(command.youtubeSearchListByRelatedToVideoId())
        ) {
          const options:
            | ICommandYoutubeSearchListByRelatedToVideoIdOptions
            | undefined = command.parse<
            ICommandYoutubeSearchListByRelatedToVideoIdOptions
          >(messageText, "iCommandYoutubeSearchListByRelatedToVideoIdOptions")
            .options;
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
        } else if (messageText.includes(command.youtubeVideoList())) {
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
        } else if (messageText.includes("/test1")) {
          store.dispatch(actions.commandUI.help());
          store.dispatch(
            actions.message.query({
              query: {
                message: { ...message, text: command.help() },
                update_id: 0
              }
            })
          );
          handleMessage(store, { ...message, text: command.help() });
        } else if (messageText.includes("/test2")) {
          store.dispatch(actions.commandUI.setInlineGeo());
          store.dispatch(
            actions.message.query({
              query: {
                message: { ...message, text: command.setInlineGeo() },
                update_id: 0
              }
            })
          );
          handleMessage(store, {
            ...message,
            text: command.setInlineGeo()
          });
        } else if (messageText.includes("/test3")) {
          store.dispatch(actions.commandUI.settings());
          store.dispatch(
            actions.message.query({
              query: {
                message: { ...message, text: command.settings() },
                update_id: 0
              }
            })
          );
          handleMessage(store, {
            ...message,
            text: command.settings()
          });
        } else if (messageText.includes("undo")) {
          store.dispatch(actions.undo.undo());
          const present: IStateCommandUI = store.getState().commandUI.present;
          const com = command.stringify((present.command as ICommand).name);
          appDebug("command", com);
          store.dispatch(
            actions.message.query({
              query: {
                message: { ...message, text: com },
                update_id: 0
              }
            })
          );
          handleMessage(store, {
            ...message,
            text: com
          });
        } else {
          store.dispatch(
            actions.youtubeSearchList.query({
              query: {
                key: env.GOOGLE_API_KEY,
                maxResults: env.GOOGLE_API_LIST_MAX_RESULTS,
                part: "id,snippet",
                q: messageText,
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
