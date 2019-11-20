import { applyMiddleware, createStore, Store, StoreEnhancer } from "redux";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "remote-redux-devtools";

import { IAction } from "../../types/iAction";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import * as env from "./env";
import { index as enhancers } from "../enhancers";
import { index as epics } from "../epics";
import { index as middlewares } from "../middlewares";
import { index as reducers } from "../reducers";

import { initialDependencies } from "../utils/dependencies";
import { initialState } from "../utils/store";

const configureStore: () => Store<IState, IAction> = (): Store<
  IState,
  IAction
> => {
  const epicMiddleware: EpicMiddleware<
    IAction,
    IAction,
    IState,
    IDependencies
  > = createEpicMiddleware({ dependencies: initialDependencies });
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
    composeEnhancers(
      applyMiddleware<{}, IState>(epicMiddleware),
      enhancers,
      middlewares
    )
  );
  epicMiddleware.run(epics);

  return store;
};

export { configureStore };
