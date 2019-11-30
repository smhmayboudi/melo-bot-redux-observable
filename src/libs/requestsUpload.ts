import debug from "debug";
import FormData from "form-data";
import * as http from "http";
import * as https from "https";

const appDebug: debug.IDebugger = debug("app:lib:requestsUpload");

const requestsUpload: <T>(
  options: https.RequestOptions,
  formData: FormData
) => Promise<T> = <T>(
  options: https.RequestOptions,
  formData: FormData
): Promise<T> =>
  new Promise(
    (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ): void => {
      const httpClientRequest: http.ClientRequest = https
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
                appDebug("DATA", chunk);
                chunks.push(chunk);
              })
              .on("end", (): void => {
                try {
                  const body: any = JSON.parse(chunks.join(""));
                  appDebug("BODY", body);
                  resolve(body as T);
                } catch (error) {
                  appDebug("ERROR", error);
                  reject(error);
                }
              });
          }
        )
        .on("error", (error: Error): void => {
          appDebug("ERROR", error);
          reject(error);
        });
      formData.pipe(httpClientRequest);
    }
  );

export { requestsUpload };
