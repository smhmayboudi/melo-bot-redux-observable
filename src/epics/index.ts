import { Action } from "redux";
import { combineEpics, Epic } from "redux-observable";

import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";

import { answerCallbackQuery } from "./answerCallbackQuery";
import { answerInlineQuery } from "./answerInlineQuery";
import { answerPreCheckoutQuery } from "./answerPreCheckoutQuery";
import { answerShippingQuery } from "./answerShippingQuery";
import { appError } from "./appError";
import { chosenInlineResult } from "./chosenInlineResult";
import { deleteWebhook } from "./deleteWebhook";
import { getChatMember } from "./getChatMember";
import { getGameHighScores } from "./getGameHighScores";
import { getUpdates } from "./getUpdates";
import { getWebhookInfo } from "./getWebhookInfo";
import { inlineQuery } from "./inlineQuery";
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

const index: Epic<
  Action<string>,
  Action<string>,
  IState,
  IDependencies
> = combineEpics(
  answerCallbackQuery,
  answerInlineQuery,
  answerPreCheckoutQuery,
  answerShippingQuery,
  appError,
  chosenInlineResult,
  deleteWebhook,
  getChatMember,
  getGameHighScores,
  getUpdates,
  getWebhookInfo,
  inlineQuery,
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
) as Epic<Action<string>, Action<string>, IState, IDependencies>;

export { index };
