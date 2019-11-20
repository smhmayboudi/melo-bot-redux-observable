import { compose, StoreEnhancer } from "redux";

import { monitorReducer } from "./monitorReducer";

const index: StoreEnhancer<{}, {}> = compose(monitorReducer);

export { index };
