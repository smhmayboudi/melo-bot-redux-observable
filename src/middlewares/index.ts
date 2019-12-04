import { applyMiddleware, StoreEnhancer } from "redux";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";

import { IAction } from "../../types/iAction";
import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { initialDependencies } from "../utils/dependencies";
import { authorization } from "./authorization";
import { crashReporter } from "./crashReporter";
import { logger } from "./logger";

const epicMiddleware: EpicMiddleware<
  IAction,
  IAction,
  IState,
  IDependencies
> = createEpicMiddleware({ dependencies: initialDependencies });

const index: StoreEnhancer<{}, {}> = applyMiddleware(
  authorization,
  crashReporter,
  epicMiddleware,
  logger
);

export { index, epicMiddleware };
