import debug from "debug";

import * as env from "./env";

const appDebug: debug.IDebugger = debug("app:config:kubernetesProbs");

const liveness = true;
let readiness = false;

setTimeout((): void => {
  appDebug("READINESS_START");
  readiness = true;
}, env.READINESS_START_TIMEOUT);

process.on("SIGTERM", (): void => {
  appDebug("READINESS_STOP");
  readiness = false;
  setTimeout((): void => {
    process.exit();
  }, env.READINESS_STOP_TIMEOUT);
});

export { liveness, readiness };
