import * as debug from "debug";

const appDebug: debug.IDebugger = debug("app:config:kubernetesProbs");

let readiness: boolean = false;
const readinessTimeout: number = 2000;
setTimeout((): void => {
  readiness = true;
}, readinessTimeout);

process.on("SIGTERM", (): void => {
  appDebug("SIGTERM");
  readiness = false;
  const sigtermTimeout: number = 2000;
  setTimeout((): void => {
    process.exit();
  }, sigtermTimeout);
});

export { readiness };
