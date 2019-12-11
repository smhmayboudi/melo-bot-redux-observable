import { StateObservable } from "redux-observable";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as env from "../configs/env";

const startAction: (
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
) => IActionGetChatMember | IActionYoutubeDownload = (
  state$: StateObservable<IState> | undefined,
  dependencies: IDependencies
): IActionGetChatMember | IActionYoutubeDownload => {
  const { locales } = dependencies;

  if (state$ === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(locales.find("state$Undefined"))
    });
  }
  if (state$.value.message.query === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(locales.find("state$ValueMessageQueryUndefined"))
    });
  }
  if (state$.value.message.query.message === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(locales.find("state$ValueMessageQueryMessageUndefined"))
    });
  }

  return actions.getChatMember.query({
    query: {
      chat_id: `@${env.CHANNEL}`,
      user_id: state$.value.message.query.message.chat.id
    }
  });
};

export { startAction };
