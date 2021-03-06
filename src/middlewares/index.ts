import { Connection } from "mariadb";
import { MongoClient } from "mongodb";
import { applyMiddleware, StoreEnhancer } from "redux";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";

import { IAction } from "../../types/iAction";
import { IDependencies } from "../../types/iDependencies";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { init as initDependencies } from "../utils/dependencies";
import { crashReporter } from "./crashReporter";
import { logger } from "./logger";

const index: (
  locales: ILocale,
  mariaClient: Connection,
  mongoClient: MongoClient
) => {
  epicMiddleware: EpicMiddleware<IAction, IAction, IState, IDependencies>;
  index: StoreEnhancer<{}, {}>;
} = (
  locales: ILocale,
  mariaClient: Connection,
  mongoClient: MongoClient
): {
  epicMiddleware: EpicMiddleware<IAction, IAction, IState, IDependencies>;
  index: StoreEnhancer<{}, {}>;
} => {
  const epicMiddleware: EpicMiddleware<
    IAction,
    IAction,
    IState,
    IDependencies
  > = createEpicMiddleware({
    dependencies: initDependencies(locales, mariaClient, mongoClient)
  });

  const index: StoreEnhancer<{}, {}> = applyMiddleware(
    crashReporter,
    epicMiddleware,
    logger
  );

  return {
    epicMiddleware,
    index
  };
};

export { index };
