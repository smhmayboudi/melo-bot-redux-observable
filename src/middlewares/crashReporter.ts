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
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";

import { IState } from "../../types/iState";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as actions from "../actions";
import * as env from "../config/env";

const appDebug: debug.IDebugger = debug("app:middleware:crashReport");

init({
  dsn: env.SENTRY_DSN,
  integrations: (integrations: Integration[]): Integration[] =>
    integrations.filter(
      (integration: Integration) => integration.name !== "OnUncaughtException"
    ),
  onFatalError: (error: Error): void => {
    appDebug(error);
  },
  serverName: env.SENTRY_SERVERNAME
});

global.process.on("uncaughtException", (error: Error): void => {
  const hub: Hub = getCurrentHub();
  hub.withScope((scope: Scope): void => {
    scope.setLevel(Severity.Fatal);
    hub.captureException(error);
  });
});

const crashReporter: Middleware = (
  middlewareAPI: MiddlewareAPI
): ((next: Dispatch) => (action: AnyAction) => AnyAction) => (
  next: Dispatch
): ((action: AnyAction) => AnyAction) => (action: AnyAction): AnyAction => {
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
  let firstName: string | undefined;
  let id: number;
  let isBot: boolean;
  let languageCode: string | undefined;
  let lastName: string | undefined;
  let userName: string | undefined;
  if (message.from !== undefined) {
    firstName = message.from.first_name;
    id = message.from.id;
    isBot = message.from.is_bot;
    languageCode = message.from.language_code;
    lastName = message.from.last_name;
    userName = message.from.username;
  }

  configureScope((scope: Scope) => {
    scope.setExtras({
      first_name: firstName,
      is_bot: isBot,
      language_code: languageCode,
      last_name: lastName,
      state
    });
    scope.setTags({
      is_bot: `${isBot}`,
      language_code: `${languageCode}`
    });
    scope.setUser({
      email: `${id}@${userName}`,
      id: `${id}`,
      ip_address: undefined,
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
