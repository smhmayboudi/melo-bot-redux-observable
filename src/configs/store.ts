import { createStore, Store, StoreEnhancer } from "redux";
import { EpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "remote-redux-devtools";

import { IAction } from "../../types/iAction";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateCommandUI } from "../../types/iStateCommandUI";
import { IStateUndo } from "../../types/iStateUndo";
import { index as enhancers } from "../enhancers";
import { index as epics } from "../epics";
import { index as middlewares } from "../middlewares";
import { index as reducers } from "../reducers";
import { initialState } from "../utils/store";
import * as env from "./env";

const configureStore: (
  locales: ILocale,
  commandUI?: IStateUndo<IStateCommandUI> | undefined
) => Store<IState, IAction> = (
  locales: ILocale,
  commandUI: IStateUndo<IStateCommandUI> | undefined
): Store<IState, IAction> => {
  const composeEnhancers: (
    ...funcs: StoreEnhancer<{}, {}>[]
  ) => StoreEnhancer<{}, {}> = composeWithDevTools({
    hostname: env.REMOTEDEV_HOSTNAME,
    name: env.REMOTEDEV_NAME,
    port: env.REMOTEDEV_PORT,
    realtime: env.REMOTEDEV_REALTIME
  });
  const middleware: {
    epicMiddleware: EpicMiddleware<IAction, IAction, IState, IDependencies>;
    index: StoreEnhancer<{}, {}>;
  } = middlewares(locales);
  const store: Store<IState, IAction> = createStore(
    reducers,
    { ...initialState, commandUI },
    composeEnhancers(middleware.index, enhancers)
  );
  middleware.epicMiddleware.run(epics);

  return store;
};

export { configureStore };
