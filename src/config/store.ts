import { Action, applyMiddleware, compose, createStore, Store } from "redux";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";

import { IDependencies } from "../../types/iDependencies";
import { IState } from "../../types/iState";
import { index as enhancers } from "../enhancers";
import { index as epics } from "../epics";
import { index as middlewares } from "../middlewares";
import { index as reducers } from "../reducers";

const configureStore:
  (dependencies?: IDependencies) => (Store<IState> & { dispatch: {} }) =
  (dependencies?: IDependencies): (Store<IState> & { dispatch: {} }) => {
    const epicMiddleware:
      EpicMiddleware<Action<string>, Action<string>, IState, IDependencies> =
      createEpicMiddleware({ dependencies: { ...dependencies } });
    const store:
      Store<IState> & { dispatch: {} } =
      createStore(
        reducers,
        compose(
          applyMiddleware(
            epicMiddleware,
          ),
          enhancers,
          middlewares,
        ),
      );
    epicMiddleware.run(epics);

    return store;
  };

export { configureStore };
