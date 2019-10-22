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
import { IStateAnswerInlineQuery } from "../../types/iStateAnswerInlineQuery";
import { IStateGetChatMember } from "../../types/iStateGetChatMember";
import { IStateInlineQuery } from "../../types/iStateInlineQuery";
import { IStateLiterate } from "../../types/iStateLiterate";
import { IStateMessage } from "../../types/iStateMessage";
import { IStateSendAudio } from "../../types/iStateSendAudio";
import { IStateSendMessage } from "../../types/iStateSendMessage";
import { IStateSendVideo } from "../../types/iStateSendVideo";
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
    answerInlineQuery: IStateAnswerInlineQuery;
    getChatMember: IStateGetChatMember;
    inlineQuery: IStateInlineQuery;
    literate: IStateLiterate;
    message: IStateMessage;
    sendAudio: IStateSendAudio;
    sendMessage: IStateSendMessage;
    sendVideo: IStateSendVideo;
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
  // TODO: "any" should change to "(...funcs: StoreEnhancer[]) => StoreEnhancer"
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
