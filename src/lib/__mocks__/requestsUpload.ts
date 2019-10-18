import * as FormData from "form-data";
import * as http from "http";

import { IStateLiterate } from "../../../types/iStateLiterate";

const literate: IStateLiterate = { query: "HI", result: "های" };

const requests: (
  _options: http.RequestOptions,
  _formData: FormData
) => Promise<any> = async (
  _options: http.RequestOptions,
  _formData: FormData
): Promise<any> =>
  new Promise(
    (
      resolve: (value?: any | PromiseLike<any>) => void,
      _reject: (reason?: any) => void
    ): void => {
      process.nextTick(() => resolve(literate));
    }
  );

export { requests };
