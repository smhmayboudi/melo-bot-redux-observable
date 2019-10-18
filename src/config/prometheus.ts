import Prometheus from "prom-client";
import gcStats from "prometheus-gc-stats";

import * as env from "./env";

Prometheus.collectDefaultMetrics({
  prefix: env.METRICS_COLLECTOR_PREFIX,
  timeout: env.METRICS_COLLECTOR_TIMEOUT
});

gcStats(Prometheus.register, {
  prefix: env.METRICS_COLLECTOR_PREFIX
})();

export { Prometheus };
