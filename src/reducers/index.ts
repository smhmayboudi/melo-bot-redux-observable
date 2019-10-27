import { combineReducers, Reducer } from "redux";

import { IStateAnswerCallbackQuery } from "../../types/iStateAnswerCallbackQuery";
import { IStateAnswerInlineQuery } from "../../types/iStateAnswerInlineQuery";
import { IStateChosenInlineResult } from "../../types/iStateChosenInlineResult";
import { IStateDeleteWebhook } from "../../types/iStateDeleteWebhook";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";
import { IStateGetUpdates } from "../../types/iStateGetUpdates";
import { IStateGetWebhookInfo } from "../../types/iStateGetWebhookInfo";
import { IStateInlineQuery } from "../../types/iStateInlineQuery";
import { IStateMessage } from "../../types/iStateMessage";
import { IStateSendAudio } from "../../types/iStateSendAudio";
import { IStateSendMessage } from "../../types/iStateSendMessage";
import { IStateSendVideo } from "../../types/iStateSendVideo";
import { IStateSetWebhook } from "../../types/iStateSetWebhook";
import { IStateYoutubeDownload } from "../../types/iStateYoutubeDownload";
import { IStateYoutubeSearchList } from "../../types/iStateYoutubeSearchList";
import { IStateYoutubeVideoList } from "../../types/iStateYoutubeVideoList";

import { answerCallbackQuery } from "./answerCallbackQuery";
import { answerInlineQuery } from "./answerInlineQuery";
import { chosenInlineResult } from "./chosenInlineResult";
import { deleteWebhook } from "./deleteWebhook";
import { getChatMember } from "./getChatMember";
import { getUpdates } from "./getUpdates";
import { getWebhookInfo } from "./getWebhookInfo";
import { inlineQuery } from "./inlineQuery";
import { message } from "./message";
import { sendAudio } from "./sendAudio";
import { sendMessage } from "./sendMessage";
import { sendVideo } from "./sendVideo";
import { setWebhook } from "./setWebhook";
import { youtubeDownload } from "./youtubeDownload";
import { youtubeSearchList } from "./youtubeSearchList";
import { youtubeVideoList } from "./youtubeVideoList";

const index: Reducer<{
  answerCallbackQuery: IStateAnswerCallbackQuery;
  answerInlineQuery: IStateAnswerInlineQuery;
  chosenInlineResult: IStateChosenInlineResult;
  deleteWebhook: IStateDeleteWebhook;
  getChatMember: IStateGetChatMember;
  getUpdates: IStateGetUpdates;
  getWebhookInfo: IStateGetWebhookInfo;
  inlineQuery: IStateInlineQuery;
  message: IStateMessage;
  sendAudio: IStateSendAudio;
  sendMessage: IStateSendMessage;
  sendVideo: IStateSendVideo;
  setWebhook: IStateSetWebhook;
  youtubeDownload: IStateYoutubeDownload;
  youtubeSearchList: IStateYoutubeSearchList;
  youtubeVideoList: IStateYoutubeVideoList;
}> = combineReducers({
  answerCallbackQuery,
  answerInlineQuery,
  chosenInlineResult,
  deleteWebhook,
  getChatMember,
  getUpdates,
  getWebhookInfo,
  inlineQuery,
  message,
  sendAudio,
  sendMessage,
  sendVideo,
  setWebhook,
  youtubeDownload,
  youtubeSearchList,
  youtubeVideoList
});

export { index };
