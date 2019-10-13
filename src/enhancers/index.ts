import { compose, DeepPartial, Reducer, StoreCreator, StoreEnhancer } from "redux";

import { monitorReducer } from "./monitorReducer";

const index:
  (createStore: StoreCreator) =>
    (reducer: Reducer, preloadedState: DeepPartial<any>)
      => StoreEnhancer =
  compose(
    monitorReducer,
  );

export { index };
