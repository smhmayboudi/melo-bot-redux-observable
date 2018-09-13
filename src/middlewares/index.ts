import { applyMiddleware, StoreEnhancer } from "redux";
import { crashReporter } from "./crashReporter";
import { logger } from "./logger";

const index: StoreEnhancer = applyMiddleware(
  crashReporter,
  logger,
);

export { index };
