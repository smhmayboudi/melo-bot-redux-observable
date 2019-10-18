import * as debug from "debug";
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";

const appDebug: debug.IDebugger = debug("app:middleware:logger");

const logger: Middleware = (
  middlewareAPI: MiddlewareAPI
): ((next: Dispatch) => (action: AnyAction) => AnyAction) => (
  next: Dispatch
): ((action: AnyAction) => AnyAction) => (action: AnyAction): AnyAction => {
  appDebug("dispatching", action);
  const result: AnyAction = next(action);
  appDebug("next state", middlewareAPI.getState());

  return result;
};

export { logger };
