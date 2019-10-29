import {
  compose,
  DeepPartial,
  Reducer,
  StoreCreator,
  StoreEnhancer
} from "redux";

import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";

import { monitorReducer } from "./monitorReducer";

const index: (
  createStore: StoreCreator
) => (
  reducer: Reducer<IState, IAction>,
  preloadedState: DeepPartial<IState>
) => StoreEnhancer = compose(monitorReducer);

export { index };
