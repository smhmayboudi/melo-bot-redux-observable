import * as debug from "debug";
import { Action, Dispatch, Middleware, MiddlewareAPI } from "redux";

const appDebug: debug.IDebugger = debug("app:middleware:crashReport");

const crashReporter: Middleware =
  (_middlewareAPI: MiddlewareAPI):
    ((next: Dispatch) => ((action: Action<string>) => Action<string>)) =>
    (next: Dispatch): ((action: Action<string>) => Action<string>) =>
      (action: Action<string>): Action<string> => {
        try {

          return next(action);
        } catch (error) {
          appDebug("exception", error);
          // Raven.captureException(error, { extra: { action, state: store.getState() } });
          throw error;
        }
      };

export { crashReporter };
