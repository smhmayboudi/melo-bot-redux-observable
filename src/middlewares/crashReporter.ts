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
import * as actions from "../actions";
import * as env from "../configs/env";
import { id, username } from "../utils/user";

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

const crashReporter: Middleware<{}, IState, Dispatch<IAction>> = ({
  getState
}: MiddlewareAPI<Dispatch<IAction>, IState>) => (next: Dispatch<IAction>) => (
  action: IAction
): IAction => {
  const state: IState = getState();
  let userId = 0;
  let userName = "";
  if (
    action.type === actions.message.MESSAGE_QUERY &&
    action.message !== undefined
  ) {
    userId = id(action.message.query);
    userName = username(action.message.query);
  } else {
    userId = id(state.message.query);
    userName = username(state.message.query);
  }
  configureScope((scope: Scope) => {
    scope.setExtras({
      state
    });
    scope.setUser({
      email: `${userId}@${userName}`,
      id: `${userId}`,
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
