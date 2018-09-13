import * as FormData from "form-data";
import * as http from "http";
import { IStateLiterate } from "../../../types/iStateLiterate";

const literate: IStateLiterate = { query: "HI", result: "های" };

const request:
  (options: http.RequestOptions, formData: FormData) => Promise<any> =
  // @ts-ignore
  async (options: http.RequestOptions, formData: FormData): Promise<any> =>
    // @ts-ignore
    new Promise((resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void): void => {
      resolve(literate);
    });

export { request };
