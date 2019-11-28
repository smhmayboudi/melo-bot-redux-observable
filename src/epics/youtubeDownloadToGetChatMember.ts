import { StateObservable } from "redux-observable";

import { IActionGetChatMember } from "../../types/iActionGetChatMember";
import { IActionYoutubeDownload } from "../../types/iActionYoutubeDownload";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as env from "../configs/env";
import * as texts from "../configs/texts";

const startAction: (
  state$: StateObservable<IState> | undefined
) => IActionGetChatMember | IActionYoutubeDownload = (
  state$: StateObservable<IState> | undefined
): IActionGetChatMember | IActionYoutubeDownload => {
  if (state$ === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(texts.state$Undefined)
    });
  }
  if (state$.value.message.query === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(texts.state$ValueMessageQueryUndefined)
    });
  }
  if (state$.value.message.query.message === undefined) {
    return actions.youtubeDownload.error({
      error: new Error(texts.state$ValueMessageQueryMessageUndefined)
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
