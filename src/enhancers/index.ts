import { compose, StoreEnhancer } from "redux";

import { monitor } from "./monitor";

const index: StoreEnhancer<{}, {}> = compose(monitor);

export { index };
