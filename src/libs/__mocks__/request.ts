import * as http from "http";

const request: (
  options: http.RequestOptions,
  data?: any
) => Promise<any> = async (
  _options: http.RequestOptions,
  _data?: any
): Promise<any> =>
  new Promise(
    (
      resolve: (value?: any | PromiseLike<any>) => void,
      _reject: (reason?: any) => void
    ): void => {
      process.nextTick(() => resolve(true));
    }
  );

export { request };
