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
import { IStateAnswerCallbackQuery } from "../../types/iStateAnswerCallbackQuery";
import { IStateAnswerInlineQuery } from "../../types/iStateAnswerInlineQuery";
import { IStateChosenInlineResult } from "../../types/iStateChosenInlineResult";
import { IStateDeleteWebhook } from "../../types/iStateDeleteWebhook";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";
import { IStateGetUpdates } from "../../types/iStateGetUpdates";
import { IStateInlineQuery } from "../../types/iStateInlineQuery";
import { IStateMessage } from "../../types/iStateMessage";
import { IStateSendAudio } from "../../types/iStateSendAudio";
import { IStateSendMessage } from "../../types/iStateSendMessage";
import { IStateSendVideo } from "../../types/iStateSendVideo";
import { IStateSetWebhook } from "../../types/iStateSetWebhook";
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
    answerCallbackQuery: IStateAnswerCallbackQuery;
    answerInlineQuery: IStateAnswerInlineQuery;
    chosenInlineResult: IStateChosenInlineResult;
    deleteWebhook: IStateDeleteWebhook;
    getChatMember: IStateGetChatMember;
    getUpdates: IStateGetUpdates;
    inlineQuery: IStateInlineQuery;
    message: IStateMessage;
    sendAudio: IStateSendAudio;
    sendMessage: IStateSendMessage;
    sendVideo: IStateSendVideo;
    setWebhook: IStateSetWebhook;
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
