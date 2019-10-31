import { combineReducers, Reducer } from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";

import { addStickerToSet } from "./addStickerToSet";
import { answerCallbackQuery } from "./answerCallbackQuery";
import { answerInlineQuery } from "./answerInlineQuery";
import { answerPreCheckoutQuery } from "./answerPreCheckoutQuery";
import { answerShippingQuery } from "./answerShippingQuery";
import { chosenInlineResult } from "./chosenInlineResult";
import { createNewStickerSet } from "./createNewStickerSet";
import { deleteChatPhoto } from "./deleteChatPhoto";
import { deleteChatStickerSet } from "./deleteChatStickerSet";
import { deleteMessage } from "./deleteMessage";
import { deleteStickerFromSet } from "./deleteStickerFromSet";
import { deleteWebhook } from "./deleteWebhook";
import { editMessageCaption } from "./editMessageCaption";
import { editMessageLiveLocation } from "./editMessageLiveLocation";
import { editMessageMedia } from "./editMessageMedia";
import { editMessageReplyMarkup } from "./editMessageReplyMarkup";
import { editMessageText } from "./editMessageText";
import { exportChatInviteLink } from "./exportChatInviteLink";
import { forwardMessage } from "./forwardMessage";
import { getChat } from "./getChat";
import { getChatAdministrators } from "./getChatAdministrators";
import { getChatMember } from "./getChatMember";
import { getChatMembersCount } from "./getChatMembersCount";
import { getFile } from "./getFile";
import { getGameHighScores } from "./getGameHighScores";
import { getMe } from "./getMe";
import { getStickerSet } from "./getStickerSet";
import { getUpdates } from "./getUpdates";
import { getUserProfilePhotos } from "./getUserProfilePhotos";
import { getWebhookInfo } from "./getWebhookInfo";
import { inlineQuery } from "./inlineQuery";
import { kickChatMember } from "./kickChatMember";
import { leaveChat } from "./leaveChat";
import { message } from "./message";
import { pinChatMessage } from "./pinChatMessage";
import { promoteChatMember } from "./promoteChatMember";
import { restrictChatMember } from "./restrictChatMember";
import { sendAnimation } from "./sendAnimation";
import { sendAudio } from "./sendAudio";
import { sendChatAction } from "./sendChatAction";
import { sendContact } from "./sendContact";
import { sendDocument } from "./sendDocument";
import { sendGame } from "./sendGame";
import { sendInvoice } from "./sendInvoice";
import { sendLocation } from "./sendLocation";
import { sendMediaGroup } from "./sendMediaGroup";
import { sendMessage } from "./sendMessage";
import { sendPhoto } from "./sendPhoto";
import { sendPoll } from "./sendPoll";
import { sendSticker } from "./sendSticker";
import { sendVenue } from "./sendVenue";
import { sendVideo } from "./sendVideo";
import { sendVideoNote } from "./sendVideoNote";
import { sendVoice } from "./sendVoice";
import { setChatDescription } from "./setChatDescription";
import { setChatPhoto } from "./setChatPhoto";
import { setChatStickerSet } from "./setChatStickerSet";
import { setChatTitle } from "./setChatTitle";
import { setGameScore } from "./setGameScore";
import { setPassportDataErrors } from "./setPassportDataErrors";
import { setStickerPositionInSet } from "./setStickerPositionInSet";
import { setWebhook } from "./setWebhook";
import { stopMessageLiveLocation } from "./stopMessageLiveLocation";
import { stopPoll } from "./stopPoll";
import { unbanChatMember } from "./unbanChatMember";
import { unpinChatMessage } from "./unpinChatMessage";
import { uploadStickerFile } from "./uploadStickerFile";
import { youtubeDownload } from "./youtubeDownload";
import { youtubeSearchList } from "./youtubeSearchList";
import { youtubeVideoList } from "./youtubeVideoList";

const index: Reducer<IState, IAction> = combineReducers({
  addStickerToSet,
  answerCallbackQuery,
  answerInlineQuery,
  answerPreCheckoutQuery,
  answerShippingQuery,
  chosenInlineResult,
  createNewStickerSet,
  deleteChatPhoto,
  deleteChatStickerSet,
  deleteMessage,
  deleteStickerFromSet,
  deleteWebhook,
  editMessageCaption,
  editMessageLiveLocation,
  editMessageMedia,
  editMessageReplyMarkup,
  editMessageText,
  exportChatInviteLink,
  forwardMessage,
  getChat,
  getChatAdministrators,
  getChatMember,
  getChatMembersCount,
  getFile,
  getGameHighScores,
  getMe,
  getStickerSet,
  getUpdates,
  getUserProfilePhotos,
  getWebhookInfo,
  inlineQuery,
  kickChatMember,
  leaveChat,
  message,
  pinChatMessage,
  promoteChatMember,
  restrictChatMember,
  sendAnimation,
  sendAudio,
  sendChatAction,
  sendContact,
  sendDocument,
  sendGame,
  sendInvoice,
  sendLocation,
  sendMediaGroup,
  sendMessage,
  sendPhoto,
  sendPoll,
  sendSticker,
  sendVenue,
  sendVideo,
  sendVideoNote,
  sendVoice,
  setChatDescription,
  setChatPhoto,
  setChatStickerSet,
  setChatTitle,
  setGameScore,
  setPassportDataErrors,
  setStickerPositionInSet,
  setWebhook,
  stopMessageLiveLocation,
  stopPoll,
  unbanChatMember,
  unpinChatMessage,
  uploadStickerFile,
  youtubeDownload,
  youtubeSearchList,
  youtubeVideoList
});

export { index };
