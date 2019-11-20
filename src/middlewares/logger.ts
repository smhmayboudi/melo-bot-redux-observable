import debug from "debug";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";

const appDebug: debug.IDebugger = debug("app:middleware:logger");

const logger: Middleware<{}, IState, Dispatch<IAction>> = (
  middlewareAPI: MiddlewareAPI<Dispatch<IAction>, IState>
) => (next: Dispatch<IAction>) => (action: IAction): IAction => {
  appDebug("dispatching", action);
  const result: IAction = next(action);
  appDebug("next state", middlewareAPI.getState());

  return result;
};

export { logger };
