import {
  Action,
  applyMiddleware,
  createStore,
  DeepPartial,
  Store
} from "redux";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "remote-redux-devtools";

import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
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
import * as actions from "../actions";
import { index as enhancers } from "../enhancers";
import { index as epics } from "../epics";
import { index as middlewares } from "../middlewares";
import { index as reducers } from "../reducers";

import * as env from "./env";
const configureStore: (
  dependencies?: IDependencies
) => Store<IState> & { dispatch: {} } = (
  dependencies?: IDependencies
): Store<IState> & { dispatch: {} } => {
  const preloadedState: DeepPartial<{
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
  }> = {
    addStickerToSet: actions.addStickerToSet.initialState,
    answerCallbackQuery: actions.answerCallbackQuery.initialState,
    answerInlineQuery: actions.answerInlineQuery.initialState,
    answerPreCheckoutQuery: actions.answerPreCheckoutQuery.initialState,
    answerShippingQuery: actions.answerShippingQuery.initialState,
    chosenInlineResult: actions.chosenInlineResult.initialState,
    createNewStickerSet: actions.createNewStickerSet.initialState,
    deleteChatPhoto: actions.deleteChatPhoto.initialState,
    deleteChatStickerSet: actions.deleteChatStickerSet.initialState,
    deleteMessage: actions.deleteMessage.initialState,
    deleteStickerFromSet: actions.deleteStickerFromSet.initialState,
    deleteWebhook: actions.deleteWebhook.initialState,
    editMessageCaption: actions.editMessageCaption.initialState,
    editMessageLiveLocation: actions.editMessageLiveLocation.initialState,
    editMessageMedia: actions.editMessageMedia.initialState,
    editMessageReplyMarkup: actions.editMessageReplyMarkup.initialState,
    editMessageText: actions.editMessageText.initialState,
    exportChatInviteLink: actions.exportChatInviteLink.initialState,
    forwardMessage: actions.forwardMessage.initialState,
    getChat: actions.getChat.initialState,
    getChatAdministrators: actions.getChatAdministrators.initialState,
    getChatMember: actions.getChatMember.initialState,
    getChatMembersCount: actions.getChatMembersCount.initialState,
    getFile: actions.getFile.initialState,
    getGameHighScores: actions.getGameHighScores.initialState,
    getMe: actions.getMe.initialState,
    getStickerSet: actions.getStickerSet.initialState,
    getUpdates: actions.getUpdates.initialState,
    getUserProfilePhotos: actions.getUserProfilePhotos.initialState,
    getWebhookInfo: actions.getWebhookInfo.initialState,
    inlineQuery: actions.inlineQuery.initialState,
    kickChatMember: actions.kickChatMember.initialState,
    leaveChat: actions.leaveChat.initialState,
    message: actions.message.initialState,
    pinChatMessage: actions.pinChatMessage.initialState,
    promoteChatMember: actions.promoteChatMember.initialState,
    restrictChatMember: actions.restrictChatMember.initialState,
    sendAnimation: actions.sendAnimation.initialState,
    sendAudio: actions.sendAudio.initialState,
    sendChatAction: actions.sendChatAction.initialState,
    sendContact: actions.sendContact.initialState,
    sendDocument: actions.sendDocument.initialState,
    sendGame: actions.sendGame.initialState,
    sendInvoice: actions.sendInvoice.initialState,
    sendLocation: actions.sendLocation.initialState,
    sendMediaGroup: actions.sendMediaGroup.initialState,
    sendMessage: actions.sendMessage.initialState,
    sendPhoto: actions.sendPhoto.initialState,
    sendPoll: actions.sendPoll.initialState,
    sendSticker: actions.sendSticker.initialState,
    sendVenue: actions.sendVenue.initialState,
    sendVideo: actions.sendVideo.initialState,
    sendVideoNote: actions.sendVideoNote.initialState,
    sendVoice: actions.sendVoice.initialState,
    setChatDescription: actions.setChatDescription.initialState,
    setChatPhoto: actions.setChatPhoto.initialState,
    setChatStickerSet: actions.setChatStickerSet.initialState,
    setChatTitle: actions.setChatTitle.initialState,
    setGameScore: actions.setGameScore.initialState,
    setPassportDataErrors: actions.setPassportDataErrors.initialState,
    setStickerPositionInSet: actions.setStickerPositionInSet.initialState,
    setWebhook: actions.setWebhook.initialState,
    stopMessageLiveLocation: actions.stopMessageLiveLocation.initialState,
    stopPoll: actions.stopPoll.initialState,
    unbanChatMember: actions.unbanChatMember.initialState,
    unpinChatMessage: actions.unpinChatMessage.initialState,
    uploadStickerFile: actions.uploadStickerFile.initialState,
    youtubeDownload: actions.youtubeDownload.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState
  };
  const epicMiddleware: EpicMiddleware<
    Action<string>,
    Action<string>,
    IState,
    IDependencies
  > = createEpicMiddleware({ dependencies: { ...dependencies } });
  const composeEnhancers: any = composeWithDevTools({
    hostname: env.REMOTEDEV_HOSTNAME,
    name: env.REMOTEDEV_NAME,
    port: env.REMOTEDEV_PORT,
    realtime: env.REMOTEDEV_REALTIME
  });
  const store: Store<IState> & { dispatch: {} } = createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(epicMiddleware), enhancers, middlewares)
  );
  epicMiddleware.run(epics);

  return store;
};

export { configureStore };
