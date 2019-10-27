import { Action } from "redux";
import { combineEpics, Epic } from "redux-observable";

import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";

import { addStickerToSet } from "./addStickerToSet";
import { answerCallbackQuery } from "./answerCallbackQuery";
import { answerInlineQuery } from "./answerInlineQuery";
import { answerPreCheckoutQuery } from "./answerPreCheckoutQuery";
import { answerShippingQuery } from "./answerShippingQuery";
import { appError } from "./appError";
import { chosenInlineResult } from "./chosenInlineResult";
import { createNewStickerSet } from "./createNewStickerSet";
import { deleteMessage } from "./deleteMessage";
import { deleteStickerFromSet } from "./deleteStickerFromSet";
import { deleteWebhook } from "./deleteWebhook";
import { editMessageCaption } from "./editMessageCaption";
import { editMessageMedia } from "./editMessageMedia";
import { editMessageReplyMarkup } from "./editMessageReplyMarkup";
import { editMessageText } from "./editMessageText";
import { getChatMember } from "./getChatMember";
import { getGameHighScores } from "./getGameHighScores";
import { getStickerSet } from "./getStickerSet";
import { getUpdates } from "./getUpdates";
import { getWebhookInfo } from "./getWebhookInfo";
import { inlineQuery } from "./inlineQuery";
import { sendAudio } from "./sendAudio";
import { sendGame } from "./sendGame";
import { sendInvoice } from "./sendInvoice";
import { sendMessage } from "./sendMessage";
import { sendSticker } from "./sendSticker";
import { sendVideo } from "./sendVideo";
import { setGameScore } from "./setGameScore";
import { setPassportDataErrors } from "./setPassportDataErrors";
import { setStickerPositionInSet } from "./setStickerPositionInSet";
import { setWebhook } from "./setWebhook";
import { stopPoll } from "./stopPoll";
import { uploadStickerFile } from "./uploadStickerFile";
import { youtubeDownload } from "./youtubeDownload";
import { youtubeSearchList } from "./youtubeSearchList";
import { youtubeVideoList } from "./youtubeVideoList";

const index: Epic<
  Action<string>,
  Action<string>,
  IState,
  IDependencies
> = combineEpics(
  addStickerToSet,
  answerCallbackQuery,
  answerInlineQuery,
  answerPreCheckoutQuery,
  answerShippingQuery,
  appError,
  chosenInlineResult,
  createNewStickerSet,
  deleteMessage,
  deleteStickerFromSet,
  deleteWebhook,
  editMessageCaption,
  editMessageMedia,
  editMessageReplyMarkup,
  editMessageText,
  getGameHighScores,
  getStickerSet,
  getChatMember,
  getUpdates,
  getWebhookInfo,
  inlineQuery,
  sendAudio,
  sendGame,
  sendInvoice,
  sendMessage,
  sendSticker,
  sendVideo,
  setGameScore,
  setPassportDataErrors,
  setStickerPositionInSet,
  setWebhook,
  stopPoll,
  uploadStickerFile,
  youtubeDownload,
  youtubeSearchList,
  youtubeVideoList
) as Epic<Action<string>, Action<string>, IState, IDependencies>;

export { index };
