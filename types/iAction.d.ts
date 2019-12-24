import { Action } from "redux";

import { IStateAddStickerToSet } from "./iStateAddStickerToSet";
import { IStateAnswerCallbackQuery } from "./iStateAnswerCallbackQuery";
import { IStateAnswerInlineQuery } from "./iStateAnswerInlineQuery";
import { IStateAnswerPreCheckoutQuery } from "./iStateAnswerPreCheckoutQuery";
import { IStateAnswerShippingQuery } from "./iStateAnswerShippingQuery";
import { IStateCallbackQueryDataFind } from "./iStateCallbackQueryDataFind";
import { IStateCallbackQueryDataInsert } from "./iStateCallbackQueryDataInsert";
import { IStateChosenInlineResult } from "./iStateChosenInlineResult";
import { IStateCommandUI } from "./iStateCommandUI";
import { IStateCreateNewStickerSet } from "./iStateCreateNewStickerSet";
import { IStateDeleteChatPhoto } from "./iStateDeleteChatPhoto";
import { IStateDeleteChatStickerSet } from "./iStateDeleteChatStickerSet";
import { IStateDeleteMessage } from "./iStateDeleteMessage";
import { IStateDeleteStickerFromSet } from "./iStateDeleteStickerFromSet";
import { IStateDeleteWebhook } from "./iStateDeleteWebhook";
import { IStateEditMessageCaption } from "./iStateEditMessageCaption";
import { IStateEditMessageLiveLocation } from "./iStateEditMessageLiveLocation";
import { IStateEditMessageMedia } from "./iStateEditMessageMedia";
import { IStateEditMessageReplyMarkup } from "./iStateEditMessageReplyMarkup";
import { IStateEditMessageText } from "./iStateEditMessageText";
import { IStateExportChatInviteLink } from "./iStateExportChatInviteLink";
import { IStateForwardMessage } from "./iStateForwardMessage";
import { IStateGetChat } from "./iStateGetChat";
import { IStateGetChatAdministrators } from "./iStateGetChatAdministrators";
import { IStateGetChatMember } from "./iStateGetChatMember";
import { IStateGetChatMembersCount } from "./iStateGetChatMembersCount";
import { IStateGetFile } from "./iStateGetFile";
import { IStateGetGameHighScores } from "./iStateGetGameHighScores";
import { IStateGetMe } from "./iStateGetMe";
import { IStateGetStickerSet } from "./iStateGetStickerSet";
import { IStateGetUpdates } from "./iStateGetUpdates";
import { IStateGetUserProfilePhotos } from "./iStateGetUserProfilePhotos";
import { IStateGetWebhookInfo } from "./iStateGetWebhookInfo";
import { IStateInlineQuery } from "./iStateInlineQuery";
import { IStateKickChatMember } from "./iStateKickChatMember";
import { IStateLeaveChat } from "./iStateLeaveChat";
import { IStateMessage } from "./iStateMessage";
import { IStatePinChatMessage } from "./iStatePinChatMessage";
import { IStatePromoteChatMember } from "./iStatePromoteChatMember";
import { IStateRestrictChatMember } from "./iStateRestrictChatMember";
import { IStateSendAnimation } from "./iStateSendAnimation";
import { IStateSendAudio } from "./iStateSendAudio";
import { IStateSendChatAction } from "./iStateSendChatAction";
import { IStateSendContact } from "./iStateSendContact";
import { IStateSendDocument } from "./iStateSendDocument";
import { IStateSendGame } from "./iStateSendGame";
import { IStateSendInvoice } from "./iStateSendInvoice";
import { IStateSendLocation } from "./iStateSendLocation";
import { IStateSendMediaGroup } from "./iStateSendMediaGroup";
import { IStateSendMessage } from "./iStateSendMessage";
import { IStateSendPhoto } from "./iStateSendPhoto";
import { IStateSendPoll } from "./iStateSendPoll";
import { IStateSendSticker } from "./iStateSendSticker";
import { IStateSendVenue } from "./iStateSendVenue";
import { IStateSendVideo } from "./iStateSendVideo";
import { IStateSendVideoNote } from "./iStateSendVideoNote";
import { IStateSendVoice } from "./iStateSendVoice";
import { IStateSetChatDescription } from "./iStateSetChatDescription";
import { IStateSetChatPhoto } from "./iStateSetChatPhoto";
import { IStateSetChatStickerSet } from "./iStateSetChatStickerSet";
import { IStateSetChatTitle } from "./iStateSetChatTitle";
import { IStateSetGameScore } from "./iStateSetGameScore";
import { IStateSetPassportDataErrors } from "./iStateSetPassportDataErrors";
import { IStateSetStickerPositionInSet } from "./iStateSetStickerPositionInSet";
import { IStateSetWebhook } from "./iStateSetWebhook";
import { IStateShortenList } from "./iStateShortenList";
import { IStateShortenReset } from "./iStateShortenReset";
import { IStateStopMessageLiveLocation } from "./iStateStopMessageLiveLocation";
import { IStateStopPoll } from "./iStateStopPoll";
import { IStateUnbanChatMember } from "./iStateUnbanChatMember";
// import { IStateUndo } from "./iStateUndo";
import { IStateUnpinChatMessage } from "./iStateUnpinChatMessage";
import { IStateUploadStickerFile } from "./iStateUploadStickerFile";
import { IStateYoutubeDownload } from "./iStateYoutubeDownload";
import { IStateYoutubeDownloadResultFind } from "./iStateYoutubeDownloadResultFind";
import { IStateYoutubeDownloadResultInsert } from "./iStateYoutubeDownloadResultInsert";
import { IStateYoutubeSearchList } from "./iStateYoutubeSearchList";
import { IStateYoutubeVideoList } from "./iStateYoutubeVideoList";

export interface IAction extends Action<string> {
  addStickerToSet?: IStateAddStickerToSet;
  answerCallbackQuery?: IStateAnswerCallbackQuery;
  answerInlineQuery?: IStateAnswerInlineQuery;
  answerPreCheckoutQuery?: IStateAnswerPreCheckoutQuery;
  answerShippingQuery?: IStateAnswerShippingQuery;
  callbackQueryDataFind?: IStateCallbackQueryDataFind;
  callbackQueryDataInsert?: IStateCallbackQueryDataInsert;
  chosenInlineResult?: IStateChosenInlineResult;
  commandUI?: IStateCommandUI;
  createNewStickerSet?: IStateCreateNewStickerSet;
  deleteChatPhoto?: IStateDeleteChatPhoto;
  deleteChatStickerSet?: IStateDeleteChatStickerSet;
  deleteMessage?: IStateDeleteMessage;
  deleteStickerFromSet?: IStateDeleteStickerFromSet;
  deleteWebhook?: IStateDeleteWebhook;
  editMessageCaption?: IStateEditMessageCaption;
  editMessageLiveLocation?: IStateEditMessageLiveLocation;
  editMessageMedia?: IStateEditMessageMedia;
  editMessageReplyMarkup?: IStateEditMessageReplyMarkup;
  editMessageText?: IStateEditMessageText;
  exportChatInviteLink?: IStateExportChatInviteLink;
  forwardMessage?: IStateForwardMessage;
  getChat?: IStateGetChat;
  getChatAdministrators?: IStateGetChatAdministrators;
  getChatMember?: IStateGetChatMember;
  getChatMembersCount?: IStateGetChatMembersCount;
  getFile?: IStateGetFile;
  getGameHighScores?: IStateGetGameHighScores;
  getMe?: IStateGetMe;
  getStickerSet?: IStateGetStickerSet;
  getUpdates?: IStateGetUpdates;
  getUserProfilePhotos?: IStateGetUserProfilePhotos;
  getWebhookInfo?: IStateGetWebhookInfo;
  inlineQuery?: IStateInlineQuery;
  kickChatMember?: IStateKickChatMember;
  leaveChat?: IStateLeaveChat;
  message?: IStateMessage;
  pinChatMessage?: IStatePinChatMessage;
  promoteChatMember?: IStatePromoteChatMember;
  restrictChatMember?: IStateRestrictChatMember;
  sendAnimation?: IStateSendAnimation;
  sendAudio?: IStateSendAudio;
  sendChatAction?: IStateSendChatAction;
  sendContact?: IStateSendContact;
  sendDocument?: IStateSendDocument;
  sendGame?: IStateSendGame;
  sendInvoice?: IStateSendInvoice;
  sendLocation?: IStateSendLocation;
  sendMediaGroup?: IStateSendMediaGroup;
  sendMessage?: IStateSendMessage;
  sendPhoto?: IStateSendPhoto;
  sendPoll?: IStateSendPoll;
  sendSticker?: IStateSendSticker;
  sendVenue?: IStateSendVenue;
  sendVideo?: IStateSendVideo;
  sendVideoNote?: IStateSendVideoNote;
  sendVoice?: IStateSendVoice;
  setChatDescription?: IStateSetChatDescription;
  setChatPhoto?: IStateSetChatPhoto;
  setChatStickerSet?: IStateSetChatStickerSet;
  setChatTitle?: IStateSetChatTitle;
  setGameScore?: IStateSetGameScore;
  setPassportDataErrors?: IStateSetPassportDataErrors;
  setStickerPositionInSet?: IStateSetStickerPositionInSet;
  setWebhook?: IStateSetWebhook;
  shortenList?: IStateShortenList;
  shortenReset?: IStateShortenReset;
  stopMessageLiveLocation?: IStateStopMessageLiveLocation;
  stopPoll?: IStateStopPoll;
  unbanChatMember?: IStateUnbanChatMember;
  // undo?: IStateUndo;
  undo?: {
    index: number;
  };
  unpinChatMessage?: IStateUnpinChatMessage;
  uploadStickerFile?: IStateUploadStickerFile;
  youtubeDownload?: IStateYoutubeDownload;
  youtubeDownloadResultFind?: IStateYoutubeDownloadResultFind;
  youtubeDownloadResultInsert?: IStateYoutubeDownloadResultInsert;
  youtubeSearchList?: IStateYoutubeSearchList;
  youtubeVideoList?: IStateYoutubeVideoList;
}
