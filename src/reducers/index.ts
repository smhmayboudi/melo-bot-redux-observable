import { combineReducers, Reducer } from "redux";

import { IStateAddStickerToSet } from "../../types/iStateAddStickerToSet";
import { IStateAnswerCallbackQuery } from "../../types/iStateAnswerCallbackQuery";
import { IStateAnswerInlineQuery } from "../../types/iStateAnswerInlineQuery";
import { IStateAnswerPreCheckoutQuery } from "../../types/iStateAnswerPreCheckoutQuery";
import { IStateAnswerShippingQuery } from "../../types/iStateAnswerShippingQuery";
import { IStateChosenInlineResult } from "../../types/iStateChosenInlineResult";
import { IStateCreateNewStickerSet } from "../../types/iStateCreateNewStickerSet";
import { IStateDeleteMessage } from "../../types/iStateDeleteMessage";
import { IStateDeleteStickerFromSet } from "../../types/iStateDeleteStickerFromSet";
import { IStateDeleteWebhook } from "../../types/iStateDeleteWebhook";
import { IStateEditMessageCaption } from "../../types/iStateEditMessageCaption";
import { IStateEditMessageMedia } from "../../types/iStateEditMessageMedia";
import { IStateEditMessageReplyMarkup } from "../../types/iStateEditMessageReplyMarkup";
import { IStateEditMessageText } from "../../types/iStateEditMessageText";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";
import { IStateGetGameHighScores } from "../../types/iStateGetGameHighScores";
import { IStateGetStickerSet } from "../../types/iStateGetStickerSet";
import { IStateGetUpdates } from "../../types/iStateGetUpdates";
import { IStateGetWebhookInfo } from "../../types/iStateGetWebhookInfo";
import { IStateInlineQuery } from "../../types/iStateInlineQuery";
import { IStateMessage } from "../../types/iStateMessage";
import { IStateSendAudio } from "../../types/iStateSendAudio";
import { IStateSendGame } from "../../types/iStateSendGame";
import { IStateSendInvoice } from "../../types/iStateSendInvoice";
import { IStateSendMessage } from "../../types/iStateSendMessage";
import { IStateSendSticker } from "../../types/iStateSendSticker";
import { IStateSendVideo } from "../../types/iStateSendVideo";
import { IStateSetGameScore } from "../../types/iStateSetGameScore";
import { IStateSetPassportDataErrors } from "../../types/iStateSetPassportDataErrors";
import { IStateSetStickerPositionInSet } from "../../types/iStateSetStickerPositionInSet";
import { IStateSetWebhook } from "../../types/iStateSetWebhook";
import { IStateStopPoll } from "../../types/iStateStopPoll";
import { IStateUploadStickerFile } from "../../types/iStateUploadStickerFile";
import { IStateYoutubeDownload } from "../../types/iStateYoutubeDownload";
import { IStateYoutubeSearchList } from "../../types/iStateYoutubeSearchList";
import { IStateYoutubeVideoList } from "../../types/iStateYoutubeVideoList";

import { addStickerToSet } from "./addStickerToSet";
import { answerCallbackQuery } from "./answerCallbackQuery";
import { answerInlineQuery } from "./answerInlineQuery";
import { answerPreCheckoutQuery } from "./answerPreCheckoutQuery";
import { answerShippingQuery } from "./answerShippingQuery";
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
import { message } from "./message";
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

const index: Reducer<{
  addStickerToSet: IStateAddStickerToSet;
  answerCallbackQuery: IStateAnswerCallbackQuery;
  answerInlineQuery: IStateAnswerInlineQuery;
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery;
  answerShippingQuery: IStateAnswerShippingQuery;
  chosenInlineResult: IStateChosenInlineResult;
  createNewStickerSet: IStateCreateNewStickerSet;
  deleteMessage: IStateDeleteMessage;
  deleteStickerFromSet: IStateDeleteStickerFromSet;
  deleteWebhook: IStateDeleteWebhook;
  editMessageCaption: IStateEditMessageCaption;
  editMessageMedia: IStateEditMessageMedia;
  editMessageReplyMarkup: IStateEditMessageReplyMarkup;
  editMessageText: IStateEditMessageText;
  getChatMember: IStateGetChatMember;
  getGameHighScores: IStateGetGameHighScores;
  getStickerSet: IStateGetStickerSet;
  getUpdates: IStateGetUpdates;
  getWebhookInfo: IStateGetWebhookInfo;
  inlineQuery: IStateInlineQuery;
  message: IStateMessage;
  sendAudio: IStateSendAudio;
  sendGame: IStateSendGame;
  sendInvoice: IStateSendInvoice;
  sendMessage: IStateSendMessage;
  sendSticker: IStateSendSticker;
  sendVideo: IStateSendVideo;
  setGameScore: IStateSetGameScore;
  setPassportDataErrors: IStateSetPassportDataErrors;
  setStickerPositionInSet: IStateSetStickerPositionInSet;
  setWebhook: IStateSetWebhook;
  stopPoll: IStateStopPoll;
  uploadStickerFile: IStateUploadStickerFile;
  youtubeDownload: IStateYoutubeDownload;
  youtubeSearchList: IStateYoutubeSearchList;
  youtubeVideoList: IStateYoutubeVideoList;
}> = combineReducers({
  addStickerToSet,
  answerCallbackQuery,
  answerInlineQuery,
  answerPreCheckoutQuery,
  answerShippingQuery,
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
  message,
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
});

export { index };
