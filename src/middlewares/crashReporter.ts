import {
  captureException,
  configureScope,
  // GetCurrentHub,
  // Hub,
  init,
  Scope
  // Severity
} from "@sentry/node";
// Import { Integration } from "@sentry/types";
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
  // Integrations: (integrations: Integration[]): Integration[] =>
  //   Integrations.filter(
  //     (integration: Integration) => integration.name !== "OnUncaughtException"
  //   ),
  onFatalError: (error: Error): void => {
    appDebug(error);
  },
  release: env.SENTRY_RELEASE,
  serverName: env.SENTRY_SERVERNAME
});

// Global.process.on("uncaughtException", (error: Error): void => {
// const hub: Hub = getCurrentHub();
//   Hub.withScope((scope: Scope): void => {
//     Scope.setLevel(Severity.Fatal);
//     Hub.captureException(error);
//   });
// });

const crashReporter: Middleware = (
  middlewareAPI: MiddlewareAPI
): ((next: Dispatch) => (action: IAction) => IAction) => (
  next: Dispatch
): ((action: IAction) => IAction) => (action: IAction): IAction => {
  let message: IMessage = {
    chat: {
      id: 0,
      type: "private"
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
    appDebug("exception", error);
    captureException(error);
    throw error;
  }
};

export { crashReporter };
