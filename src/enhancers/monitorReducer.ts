import debug from "debug";
import { performance } from "perf_hooks";
import {
  DeepPartial,
  Reducer,
  Store,
  StoreEnhancer,
  StoreEnhancerStoreCreator
} from "redux";

import * as env from "../configs/env";
import { Prometheus } from "../configs/prometheus";
import { IAction } from "../../types/iAction";
import { IState } from "../../types/iState";

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

const monitorReducer: StoreEnhancer<{}, {}> = (
  next: StoreEnhancerStoreCreator<{}, {}>
) => (
  reducer: Reducer<any, any>,
  preloadedState?: DeepPartial<IState>
): Store<any, any> => {
  const monitoredReducer: (
    state: IState | undefined,
    action: IAction
  ) => IState = (state: IState | undefined, action: IAction): IState => {
    const start: number = performance.now();
    const newState: IState = reducer(state, action);
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
