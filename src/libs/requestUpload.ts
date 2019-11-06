import debug from "debug";
import FormData from "form-data";
import * as http from "http";

const appDebug: debug.IDebugger = debug("app:lib:requestUpload");

const requestUpload: <T>(
  options: http.RequestOptions,
  formData: FormData
) => Promise<T> = <T>(
  options: http.RequestOptions,
  formData: FormData
): Promise<T> =>
  new Promise(
    (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ): void => {
      const httpClientRequest: http.ClientRequest = http
        .request(
          {
            method: "POST",
            ...options,
            headers: {
              ...(formData.getHeaders() as http.OutgoingHttpHeaders),
              ...options.headers
            }
          },
          (response: http.IncomingMessage): void => {
            appDebug("response.statusCode", response.statusCode);
            const chunks: Uint8Array[] = [];
            response
              .setEncoding("utf8")
              .on("data", (chunk: Uint8Array): void => {
                appDebug("data", chunk);
                chunks.push(chunk);
              })
              .on("end", (): void => {
                try {
                  const body: any = JSON.parse(chunks.join(""));
                  appDebug("body", body);
                  resolve(body as T);
                } catch (error) {
                  appDebug("error", error);
                  reject(error);
                }
              });
          }
        )
        .on("error", (error: Error): void => {
          appDebug("error", error);
          reject(error);
        });
      formData.pipe(httpClientRequest);
    }
  );

export { requestUpload };
