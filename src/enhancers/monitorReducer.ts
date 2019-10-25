import debug from "debug";
import { performance } from "perf_hooks";
import {
  Action,
  DeepPartial,
  Reducer,
  StoreCreator,
  StoreEnhancer
} from "redux";

import * as env from "../configs/env";
import { Prometheus } from "../configs/prometheus";

const appDebug: debug.IDebugger = debug("app:enhancers:monitorReducer");

const counter: Prometheus.Counter = new Prometheus.Counter({
  help: "Count of reducer process",
  labelNames: ["action_type"],
  name: `${env.METRICS_COLLECTOR_PREFIX}reducer_process_time`
});

const gauge: Prometheus.Gauge = new Prometheus.Gauge({
  help: "reducer process time in milliseconds",
  labelNames: ["action_type"],
  name: `${env.METRICS_COLLECTOR_PREFIX}reducer_process_time_milliseconds`
});

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
    const start: number = performance.now();
    const newState: any = reducer(state, action);
    const end: number = performance.now();
    const diff: number = end - start;
    appDebug(`reducer process time ${diff}ms`);
    const dateNow: number = Date.now();
    counter.inc({ action_type: action.type }, 1, dateNow);
    gauge.set({ action_type: action.type }, diff, dateNow);

    return newState;
  };

  return next(monitoredReducer, preloadedState);
};

export { monitorReducer };
