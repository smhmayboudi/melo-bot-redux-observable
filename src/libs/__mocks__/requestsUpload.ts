import FormData from "form-data";
import * as http from "http";

const requests: (
  options: http.RequestOptions,
  formData: FormData
) => Promise<any> = (
  _options: http.RequestOptions,
  _formData: FormData
): Promise<any> =>
  new Promise(
    (
      resolve: (value?: any | PromiseLike<any>) => void,
      _reject: (reason?: any) => void
    ): void => {
      process.nextTick(() => resolve(true));
    }
  );

export { requests };
