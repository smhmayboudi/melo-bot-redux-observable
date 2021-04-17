import * as http from "http";

const request: <T>(
  options: http.RequestOptions,
  data?: any
) => Promise<boolean> = <T>(
  _options: http.RequestOptions,
  _data?: any
): Promise<boolean> =>
  new Promise(
    (
      resolve: (value?: boolean | PromiseLike<boolean>) => void,
      _reject: (reason?: any) => void
    ): void => {
      process.nextTick(() => resolve(true));
    }
  );

export { request };
