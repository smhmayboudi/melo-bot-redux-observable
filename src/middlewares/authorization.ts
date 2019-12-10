import { Enforcer, newEnforcer } from "casbin";
import debug from "debug";
import * as path from "path";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";
import * as actions from "../actions";
import * as texts from "../configs/texts";

const appDebug: debug.IDebugger = debug("app:middleware:authorization");

const authorization: Middleware<{}, IState, Dispatch<IAction>> = ({
  getState
}: MiddlewareAPI<Dispatch<IAction>, IState>) => (
  next: Dispatch<IAction>
) => async (action: IAction): Promise<IAction> => {
  const enforcer: Enforcer = await newEnforcer(
    path.resolve(__dirname, "../../authorization.conf"),
    path.resolve(__dirname, "../../authorization.csv")
  );
  const state: IState = getState();
  if (
    state.message.query !== undefined &&
    state.message.query.message !== undefined &&
    state.message.query.message.from !== undefined
  ) {
    const result: boolean = await enforcer.enforce(
      state.message.query.message.from.id,
      action.type
    );
    if (!result) {
      appDebug(
        "UNAUTHORIZED_ACCESS",
        `${state.message.query.message.from.id}@${state.message.query.message.from.username}`,
        action.type
      );
      return next(
        actions.sendMessage.query({
          query: {
            chat_id: state.message.query.message.chat.id,
            disable_notification: true,
            disable_web_page_preview: true,
            parse_mode: "HTML",
            reply_to_message_id: state.message.query.message.message_id,
            text: texts.messageNoAuthorization
          }
        })
      );
    }
  }
  return Promise.resolve(next(action));
};

export { authorization };
