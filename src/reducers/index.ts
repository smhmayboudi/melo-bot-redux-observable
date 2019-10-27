import { combineReducers, Reducer } from "redux";

import { IStateAnswerCallbackQuery } from "../../types/iStateAnswerCallbackQuery";
import { IStateAnswerInlineQuery } from "../../types/iStateAnswerInlineQuery";
import { IStateAnswerPreCheckoutQuery } from "../../types/iStateAnswerPreCheckoutQuery";
import { IStateAnswerShippingQuery } from "../../types/iStateAnswerShippingQuery";
import { IStateChosenInlineResult } from "../../types/iStateChosenInlineResult";
import { IStateDeleteWebhook } from "../../types/iStateDeleteWebhook";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";
import { IStateGetGameHighScores } from "../../types/iStateGetGameHighScores";
import { IStateGetUpdates } from "../../types/iStateGetUpdates";
import { IStateGetWebhookInfo } from "../../types/iStateGetWebhookInfo";
import { IStateInlineQuery } from "../../types/iStateInlineQuery";
import { IStateMessage } from "../../types/iStateMessage";
import { IStateSendAudio } from "../../types/iStateSendAudio";
import { IStateSendGame } from "../../types/iStateSendGame";
import { IStateSendInvoice } from "../../types/iStateSendInvoice";
import { IStateSendMessage } from "../../types/iStateSendMessage";
import { IStateSendVideo } from "../../types/iStateSendVideo";
import { IStateSetGameScore } from "../../types/iStateSetGameScore";
import { IStateSetPassportDataErrors } from "../../types/iStateSetPassportDataErrors";
import { IStateSetWebhook } from "../../types/iStateSetWebhook";
import { IStateYoutubeDownload } from "../../types/iStateYoutubeDownload";
import { IStateYoutubeSearchList } from "../../types/iStateYoutubeSearchList";
import { IStateYoutubeVideoList } from "../../types/iStateYoutubeVideoList";

import { answerCallbackQuery } from "./answerCallbackQuery";
import { answerInlineQuery } from "./answerInlineQuery";
import { answerPreCheckoutQuery } from "./answerPreCheckoutQuery";
import { answerShippingQuery } from "./answerShippingQuery";
import { chosenInlineResult } from "./chosenInlineResult";
import { deleteWebhook } from "./deleteWebhook";
import { getChatMember } from "./getChatMember";
import { getGameHighScores } from "./getGameHighScores";
import { getUpdates } from "./getUpdates";
import { getWebhookInfo } from "./getWebhookInfo";
import { inlineQuery } from "./inlineQuery";
import { message } from "./message";
import { sendAudio } from "./sendAudio";
import { sendGame } from "./sendGame";
import { sendInvoice } from "./sendInvoice";
import { sendMessage } from "./sendMessage";
import { sendVideo } from "./sendVideo";
import { setGameScore } from "./setGameScore";
import { setPassportDataErrors } from "./setPassportDataErrors";
import { setWebhook } from "./setWebhook";
import { youtubeDownload } from "./youtubeDownload";
import { youtubeSearchList } from "./youtubeSearchList";
import { youtubeVideoList } from "./youtubeVideoList";

const index: Reducer<{
  answerCallbackQuery: IStateAnswerCallbackQuery;
  answerInlineQuery: IStateAnswerInlineQuery;
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery;
  answerShippingQuery: IStateAnswerShippingQuery;
  chosenInlineResult: IStateChosenInlineResult;
  deleteWebhook: IStateDeleteWebhook;
  getChatMember: IStateGetChatMember;
  getGameHighScores: IStateGetGameHighScores;
  getUpdates: IStateGetUpdates;
  getWebhookInfo: IStateGetWebhookInfo;
  inlineQuery: IStateInlineQuery;
  message: IStateMessage;
  sendAudio: IStateSendAudio;
  sendGame: IStateSendGame;
  sendInvoice: IStateSendInvoice;
  sendMessage: IStateSendMessage;
  sendVideo: IStateSendVideo;
  setGameScore: IStateSetGameScore;
  setPassportDataErrors: IStateSetPassportDataErrors;
  setWebhook: IStateSetWebhook;
  youtubeDownload: IStateYoutubeDownload;
  youtubeSearchList: IStateYoutubeSearchList;
  youtubeVideoList: IStateYoutubeVideoList;
}> = combineReducers({
  answerCallbackQuery,
  answerInlineQuery,
  answerPreCheckoutQuery,
  answerShippingQuery,
  chosenInlineResult,
  deleteWebhook,
  getChatMember,
  getGameHighScores,
  getUpdates,
  getWebhookInfo,
  inlineQuery,
  message,
  sendAudio,
  sendGame,
  sendInvoice,
  sendMessage,
  sendVideo,
  setGameScore,
  setPassportDataErrors,
  setWebhook,
  youtubeDownload,
  youtubeSearchList,
  youtubeVideoList
});

export { index };
