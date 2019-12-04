import { createStore, Store, StoreEnhancer } from "redux";
import { composeWithDevTools } from "remote-redux-devtools";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";
import { index as enhancers } from "../enhancers";
import { index as epics } from "../epics";
import { index as middlewares, epicMiddleware } from "../middlewares";
import { index as reducers } from "../reducers";
import { initialState } from "../utils/store";
import * as env from "./env";

const configureStore: () => Store<IState, IAction> = (): Store<
  IState,
  IAction
> => {
  const composeEnhancers: (
    ...funcs: StoreEnhancer<{}, {}>[]
  ) => StoreEnhancer<{}, {}> = composeWithDevTools({
    hostname: env.REMOTEDEV_HOSTNAME,
    name: env.REMOTEDEV_NAME,
    port: env.REMOTEDEV_PORT,
    realtime: env.REMOTEDEV_REALTIME
  });
  const store: Store<IState, IAction> = createStore(
    reducers,
    initialState,
    composeEnhancers(middlewares, enhancers)
  );
  epicMiddleware.run(epics);

  return store;
};

export { configureStore };
