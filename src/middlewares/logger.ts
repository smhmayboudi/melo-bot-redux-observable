import debug from "debug";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";

import { IAction } from "../../types/iAction";

const appDebug: debug.IDebugger = debug("app:middleware:logger");

const logger: Middleware = (
  middlewareAPI: MiddlewareAPI
): ((next: Dispatch) => (action: IAction) => IAction) => (
  next: Dispatch
): ((action: IAction) => IAction) => (action: IAction): IAction => {
  appDebug("dispatching", action);
  const result: IAction = next(action);
  appDebug("next state", middlewareAPI.getState());

  return result;
};

export { logger };
