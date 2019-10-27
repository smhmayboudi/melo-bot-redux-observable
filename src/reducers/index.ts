import { combineReducers, Reducer } from "redux";

import { IStateAddStickerToSet } from "../../types/iStateAddStickerToSet";
import { IStateAnswerCallbackQuery } from "../../types/iStateAnswerCallbackQuery";
import { IStateAnswerInlineQuery } from "../../types/iStateAnswerInlineQuery";
import { IStateAnswerPreCheckoutQuery } from "../../types/iStateAnswerPreCheckoutQuery";
import { IStateAnswerShippingQuery } from "../../types/iStateAnswerShippingQuery";
import { IStateChosenInlineResult } from "../../types/iStateChosenInlineResult";
import { IStateCreateNewStickerSet } from "../../types/iStateCreateNewStickerSet";
import { IStateDeleteChatPhoto } from "../../types/iStateDeleteChatPhoto";
import { IStateDeleteChatStickerSet } from "../../types/iStateDeleteChatStickerSet";
import { IStateDeleteMessage } from "../../types/iStateDeleteMessage";
import { IStateDeleteStickerFromSet } from "../../types/iStateDeleteStickerFromSet";
import { IStateDeleteWebhook } from "../../types/iStateDeleteWebhook";
import { IStateEditMessageCaption } from "../../types/iStateEditMessageCaption";
import { IStateEditMessageLiveLocation } from "../../types/iStateEditMessageLiveLocation";
import { IStateEditMessageMedia } from "../../types/iStateEditMessageMedia";
import { IStateEditMessageReplyMarkup } from "../../types/iStateEditMessageReplyMarkup";
import { IStateEditMessageText } from "../../types/iStateEditMessageText";
import { IStateExportChatInviteLink } from "../../types/iStateExportChatInviteLink";
import { IStateForwardMessage } from "../../types/iStateForwardMessage";
import { IStateGetChat } from "../../types/iStateGetChat";
import { IStateGetChatAdministrators } from "../../types/iStateGetChatAdministrators";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";
import { IStateGetChatMembersCount } from "../../types/iStateGetChatMembersCount";
import { IStateGetFile } from "../../types/iStateGetFile";
import { IStateGetGameHighScores } from "../../types/iStateGetGameHighScores";
import { IStateGetMe } from "../../types/iStateGetMe";
import { IStateGetStickerSet } from "../../types/iStateGetStickerSet";
import { IStateGetUpdates } from "../../types/iStateGetUpdates";
import { IStateGetUserProfilePhotos } from "../../types/iStateGetUserProfilePhotos";
import { IStateGetWebhookInfo } from "../../types/iStateGetWebhookInfo";
import { IStateInlineQuery } from "../../types/iStateInlineQuery";
import { IStateKickChatMember } from "../../types/iStateKickChatMember";
import { IStateLeaveChat } from "../../types/iStateLeaveChat";
import { IStateMessage } from "../../types/iStateMessage";
import { IStatePinChatMessage } from "../../types/iStatePinChatMessage";
import { IStatePromoteChatMember } from "../../types/iStatePromoteChatMember";
import { IStateRestrictChatMember } from "../../types/iStateRestrictChatMember";
import { IStateSendAnimation } from "../../types/iStateSendAnimation";
import { IStateSendAudio } from "../../types/iStateSendAudio";
import { IStateSendChatAction } from "../../types/iStateSendChatAction";
import { IStateSendContact } from "../../types/iStateSendContact";
import { IStateSendDocument } from "../../types/iStateSendDocument";
import { IStateSendGame } from "../../types/iStateSendGame";
import { IStateSendInvoice } from "../../types/iStateSendInvoice";
import { IStateSendLocation } from "../../types/iStateSendLocation";
import { IStateSendMediaGroup } from "../../types/iStateSendMediaGroup";
import { IStateSendMessage } from "../../types/iStateSendMessage";
import { IStateSendPhoto } from "../../types/iStateSendPhoto";
import { IStateSendPoll } from "../../types/iStateSendPoll";
import { IStateSendSticker } from "../../types/iStateSendSticker";
import { IStateSendVenue } from "../../types/iStateSendVenue";
import { IStateSendVideo } from "../../types/iStateSendVideo";
import { IStateSendVideoNote } from "../../types/iStateSendVideoNote";
import { IStateSendVoice } from "../../types/iStateSendVoice";
import { IStateSetChatDescription } from "../../types/iStateSetChatDescription";
import { IStateSetChatPhoto } from "../../types/iStateSetChatPhoto";
import { IStateSetChatStickerSet } from "../../types/iStateSetChatStickerSet";
import { IStateSetChatTitle } from "../../types/iStateSetChatTitle";
import { IStateSetGameScore } from "../../types/iStateSetGameScore";
import { IStateSetPassportDataErrors } from "../../types/iStateSetPassportDataErrors";
import { IStateSetStickerPositionInSet } from "../../types/iStateSetStickerPositionInSet";
import { IStateSetWebhook } from "../../types/iStateSetWebhook";
import { IStateStopMessageLiveLocation } from "../../types/iStateStopMessageLiveLocation";
import { IStateStopPoll } from "../../types/iStateStopPoll";
import { IStateUnbanChatMember } from "../../types/iStateUnbanChatMember";
import { IStateUnpinChatMessage } from "../../types/iStateUnpinChatMessage";
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
const index: Reducer<{
  addStickerToSet: IStateAddStickerToSet;
  answerCallbackQuery: IStateAnswerCallbackQuery;
  answerInlineQuery: IStateAnswerInlineQuery;
  answerPreCheckoutQuery: IStateAnswerPreCheckoutQuery;
  answerShippingQuery: IStateAnswerShippingQuery;
  chosenInlineResult: IStateChosenInlineResult;
  createNewStickerSet: IStateCreateNewStickerSet;
  deleteChatPhoto: IStateDeleteChatPhoto;
  deleteChatStickerSet: IStateDeleteChatStickerSet;
  deleteMessage: IStateDeleteMessage;
  deleteStickerFromSet: IStateDeleteStickerFromSet;
  deleteWebhook: IStateDeleteWebhook;
  editMessageCaption: IStateEditMessageCaption;
  editMessageLiveLocation: IStateEditMessageLiveLocation;
  editMessageMedia: IStateEditMessageMedia;
  editMessageReplyMarkup: IStateEditMessageReplyMarkup;
  editMessageText: IStateEditMessageText;
  exportChatInviteLink: IStateExportChatInviteLink;
  forwardMessage: IStateForwardMessage;
  getChat: IStateGetChat;
  getChatAdministrators: IStateGetChatAdministrators;
  getChatMember: IStateGetChatMember;
  getChatMembersCount: IStateGetChatMembersCount;
  getFile: IStateGetFile;
  getGameHighScores: IStateGetGameHighScores;
  getMe: IStateGetMe;
  getStickerSet: IStateGetStickerSet;
  getUpdates: IStateGetUpdates;
  getUserProfilePhotos: IStateGetUserProfilePhotos;
  getWebhookInfo: IStateGetWebhookInfo;
  inlineQuery: IStateInlineQuery;
  kickChatMember: IStateKickChatMember;
  leaveChat: IStateLeaveChat;
  message: IStateMessage;
  pinChatMessage: IStatePinChatMessage;
  promoteChatMember: IStatePromoteChatMember;
  restrictChatMember: IStateRestrictChatMember;
  sendAnimation: IStateSendAnimation;
  sendAudio: IStateSendAudio;
  sendChatAction: IStateSendChatAction;
  sendContact: IStateSendContact;
  sendDocument: IStateSendDocument;
  sendGame: IStateSendGame;
  sendInvoice: IStateSendInvoice;
  sendLocation: IStateSendLocation;
  sendMediaGroup: IStateSendMediaGroup;
  sendMessage: IStateSendMessage;
  sendPhoto: IStateSendPhoto;
  sendPoll: IStateSendPoll;
  sendSticker: IStateSendSticker;
  sendVenue: IStateSendVenue;
  sendVideo: IStateSendVideo;
  sendVideoNote: IStateSendVideoNote;
  sendVoice: IStateSendVoice;
  setChatDescription: IStateSetChatDescription;
  setChatPhoto: IStateSetChatPhoto;
  setChatStickerSet: IStateSetChatStickerSet;
  setChatTitle: IStateSetChatTitle;
  setGameScore: IStateSetGameScore;
  setPassportDataErrors: IStateSetPassportDataErrors;
  setStickerPositionInSet: IStateSetStickerPositionInSet;
  setWebhook: IStateSetWebhook;
  stopMessageLiveLocation: IStateStopMessageLiveLocation;
  stopPoll: IStateStopPoll;
  unbanChatMember: IStateUnbanChatMember;
  unpinChatMessage: IStateUnpinChatMessage;
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
