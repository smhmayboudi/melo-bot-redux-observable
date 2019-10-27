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
  }> = {};
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
