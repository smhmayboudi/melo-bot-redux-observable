import * as Prometheus from "prom-client";
import * as PrometheusGCState from "prometheus-gc-stats";

import * as env from "./env";

Prometheus.collectDefaultMetrics({
  prefix: env.METRICS_COLLECTOR_PREFIX,
  timeout: env.METRICS_COLLECTOR_TIMEOUT
});

PrometheusGCState(Prometheus.register, {
  prefix: env.METRICS_COLLECTOR_PREFIX
})();

export { Prometheus };
