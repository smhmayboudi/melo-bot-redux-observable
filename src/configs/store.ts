import { Connection } from "mariadb";
import { MongoClient } from "mongodb";
import { createStore, Store, StoreEnhancer } from "redux";
import { EpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "remote-redux-devtools";

import { IAction } from "../../types/iAction";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateCommandUI } from "../../types/iStateCommandUI";
import { IStateUndoInsert } from "../../types/iStateUndoInsert";
import { index as enhancers } from "../enhancers";
import { index as epics } from "../epics";
import { index as middlewares } from "../middlewares";
import { index as reducers } from "../reducers";
import { initialState } from "../utils/store";
import * as env from "./env";

const configureStore: (
  commandUI: IStateUndoInsert<IStateCommandUI> | null,
  locales: ILocale,
  mariaClient: Connection,
  mongoClient: MongoClient
) => Store<IState, IAction> = (
  commandUI: IStateUndoInsert<IStateCommandUI> | null,
  locales: ILocale,
  mariaClient: Connection,
  mongoClient: MongoClient
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
  } = middlewares(locales, mariaClient, mongoClient);
  const store: Store<IState, IAction> = createStore(
    reducers,
    commandUI !== null ? { ...initialState, commandUI } : initialState,
    composeEnhancers(middleware.index, enhancers)
  );
  middleware.epicMiddleware.run(epics);

  return store;
};

export { configureStore };
