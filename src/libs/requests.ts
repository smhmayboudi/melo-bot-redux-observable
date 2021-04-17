import debug from "debug";
import * as http from "http";
import * as https from "https";

const appDebug: debug.IDebugger = debug("app:lib:requests");

const requests: <T>(options: https.RequestOptions, data?: any) => Promise<T> = <
  T
>(
  options: https.RequestOptions,
  data?: any
): Promise<T> =>
  new Promise<T>(
    (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ): void => {
      const isMethodPost: boolean =
        options.method !== undefined &&
        options.method === "POST" &&
        data !== undefined;
      const dataStringify: string = isMethodPost ? JSON.stringify(data) : "";
      const httpClientRequest: http.ClientRequest = https
        .request(
          {
            method: "GET",
            ...options,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "User-Agent": "node",
              ...(): http.OutgoingHttpHeaders =>
                isMethodPost
                  ? { "Content-Length": Buffer.byteLength(dataStringify) }
                  : {},
              ...options.headers
            }
          },
          (response: http.IncomingMessage): void => {
            appDebug("RESPONSE_STATUS_CODE", response.statusCode);
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
      if (isMethodPost) {
        appDebug("POST", dataStringify);
        httpClientRequest.write(dataStringify);
      }
      httpClientRequest.end((): void => {
        appDebug("END");
      });
    }
  );

export { requests };
