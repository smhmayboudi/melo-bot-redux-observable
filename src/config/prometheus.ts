import * as Prometheus from "prom-client";

Prometheus.collectDefaultMetrics();

export { Prometheus };
