import * as debug from "debug";
import { Action, Dispatch, Middleware, MiddlewareAPI } from "redux";

const appDebug: debug.IDebugger = debug("app:middleware:logger");

const logger: Middleware =
  (middlewareAPI: MiddlewareAPI):
    ((next: Dispatch) => ((action: Action<string>) => Action<string>)) =>
    (next: Dispatch): ((action: Action<string>) => Action<string>) =>
      (action: Action<string>): Action<string> => {
        appDebug("dispatching", action);
        const result: Action<string> = next(action);
        appDebug("next state", middlewareAPI.getState());

        return result;
      };

export { logger };
