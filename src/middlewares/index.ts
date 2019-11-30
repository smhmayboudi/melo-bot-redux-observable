import { applyMiddleware, StoreEnhancer } from "redux";

import { authorization } from "./authorization";
import { crashReporter } from "./crashReporter";
import { logger } from "./logger";

const index: StoreEnhancer<{}, {}> = applyMiddleware(
  authorization,
  crashReporter,
  logger
);

export { index };
