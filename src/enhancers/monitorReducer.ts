import * as debug from "debug";
import { performance } from "perf_hooks";
import {
  Action,
  DeepPartial,
  Reducer,
  StoreCreator,
  StoreEnhancer
} from "redux";

const appDebug: debug.IDebugger = debug("app:enhancers:monitorReducer");

const monitorReducer: (
  next: StoreCreator
) => (reducer: Reducer, preloadedState: DeepPartial<any>) => StoreEnhancer = (
  next: StoreCreator
): ((reducer: Reducer, preloadedState: DeepPartial<any>) => StoreEnhancer) => (
  reducer: Reducer,
  preloadedState: DeepPartial<any>
): StoreEnhancer => {
  const monitoredReducer: (state: any, action: Action<string>) => any = (
    state: any,
    action: Action<string>
  ): any => {
    const per: number = 100;
    const round: (num: number) => number = (num: number): number =>
      Math.round(num * per) / per;
    const start: number = performance.now();
    const newState: any = reducer(state, action);
    const end: number = performance.now();
    const diff: number = round(end - start);
    appDebug("reducer process time", diff);

    return newState;
  };

  return next(monitoredReducer, preloadedState);
};

export { monitorReducer };
