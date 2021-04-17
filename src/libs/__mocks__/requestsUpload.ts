import FormData from "form-data";
import * as http from "http";

const requestsUpload: <T>(
  options: http.RequestOptions,
  formData: FormData
) => Promise<boolean> = <T>(
  _options: http.RequestOptions,
  _formData: FormData
): Promise<boolean> =>
  new Promise(
    (
      resolve: (value?: boolean | PromiseLike<boolean>) => void,
      _reject: (reason?: any) => void
    ): void => {
      process.nextTick(() => resolve(true));
    }
  );

export { requestsUpload };
