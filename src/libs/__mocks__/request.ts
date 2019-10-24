import * as http from "http";

import { IStateLiterate } from "../../../types/iStateLiterate";

const literate: IStateLiterate = { query: "HI", result: "های" };

const request: (
  _options: http.RequestOptions,
  _data?: any
) => Promise<any> = async (
  _options: http.RequestOptions,
  _data?: any
): Promise<any> =>
  new Promise(
    (
      resolve: (value?: any | PromiseLike<any>) => void,
      _reject: (reason?: any) => void
    ): void => {
      process.nextTick(() => resolve(literate));
    }
  );

export { request };
