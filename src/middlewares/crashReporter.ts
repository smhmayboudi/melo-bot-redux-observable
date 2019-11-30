import {
  captureException,
  configureScope,
  getCurrentHub,
  Hub,
  init,
  Scope,
  Severity
} from "@sentry/node";
import { Integration } from "@sentry/types";
import debug from "debug";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as env from "../configs/env";

const appDebug: debug.IDebugger = debug("app:middleware:crashReport");

init({
  dsn: env.SENTRY_DSN,
  integrations: (integrations: Integration[]): Integration[] =>
    integrations.filter(
      (integration: Integration) => integration.name !== "OnUncaughtException"
    ),
  onFatalError: (error: Error): void => {
    appDebug("ERROR", error);
  },
  release: env.SENTRY_RELEASE,
  serverName: env.SENTRY_SERVERNAME
});

global.process.on("uncaughtException", (error: Error): void => {
  const hub: Hub = getCurrentHub();
  hub.withScope((scope: Scope): void => {
    scope.setLevel(Severity.Fatal);
    hub.captureException(error);
  });
});

const crashReporter: Middleware<{}, IState, Dispatch<IAction>> = (
  middlewareAPI: MiddlewareAPI<Dispatch<IAction>, IState>
) => (next: Dispatch<IAction>) => (action: IAction): IAction => {
  let message: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
  };
  if (
    action.type === actions.message.MESSAGE_QUERY &&
    action.message !== undefined &&
    action.message.query !== undefined &&
    action.message.query.message !== undefined
  ) {
    message = action.message.query.message;
  }
  const state: IState = middlewareAPI.getState();
  if (
    state.message.query !== undefined &&
    state.message.query.message !== undefined
  ) {
    message = state.message.query.message;
  }
  let id: number;
  let userName: string | undefined;
  if (message.from !== undefined) {
    id = message.from.id;
    userName = message.from.username;
  }
  configureScope((scope: Scope) => {
    scope.setExtras({
      state
    });
    scope.setUser({
      email: `${id}@${userName}`,
      id: `${id}`,
      username: userName
    });
  });
  try {
    return next(action);
  } catch (error) {
    appDebug("ERROR", error);
    captureException(error);
    throw error;
  }
};

export { crashReporter };
