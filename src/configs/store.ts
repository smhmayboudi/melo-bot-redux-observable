import { applyMiddleware, createStore, DeepPartial, Store } from "redux";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "remote-redux-devtools";

import { IAction } from "../../types/iAction";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as env from "./env";
import { index as enhancers } from "../enhancers";
import { index as epics } from "../epics";
import { index as middlewares } from "../middlewares";
import { index as reducers } from "../reducers";

const configureStore: (dependencies?: IDependencies) => Store<IState> = (
  dependencies?: IDependencies
): Store<IState> => {
  const preloadedState: DeepPartial<IState> = {
    addStickerToSet: actions.addStickerToSet.initialState,
    answerCallbackQuery: actions.answerCallbackQuery.initialState,
    answerInlineQuery: actions.answerInlineQuery.initialState,
    answerPreCheckoutQuery: actions.answerPreCheckoutQuery.initialState,
    answerShippingQuery: actions.answerShippingQuery.initialState,
    callbackQueryDataFind: actions.callbackQueryDataFind.initialState,
    callbackQueryDataInsert: actions.callbackQueryDataInsert.initialState,
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
    youtubeDownloadResultInsert:
      actions.youtubeDownloadResultInsert.initialState,
    youtubeDownloadResultFind: actions.youtubeDownloadResultFind.initialState,
    youtubeSearchList: actions.youtubeSearchList.initialState,
    youtubeVideoList: actions.youtubeVideoList.initialState
  };
  const epicMiddleware: EpicMiddleware<
    IAction,
    IAction,
    IState,
    IDependencies
  > = createEpicMiddleware({ dependencies });
  // TODO: fix it any to (...funcs: StoreEnhancer[]) => StoreEnhancer
  const composeEnhancers: any = composeWithDevTools({
    hostname: env.REMOTEDEV_HOSTNAME,
    name: env.REMOTEDEV_NAME,
    port: env.REMOTEDEV_PORT,
    realtime: env.REMOTEDEV_REALTIME
  });
  const store: Store<IState> = createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(epicMiddleware), enhancers, middlewares)
  );
  epicMiddleware.run(epics);

  return store;
};

export { configureStore };
