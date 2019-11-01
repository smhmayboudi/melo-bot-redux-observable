import debug from "debug";
import * as http from "http";

const appDebug: debug.IDebugger = debug("app:lib:request");

const request: <T>(
  options: http.RequestOptions,
  data?: any
) => Promise<T> = async <T>(
  options: http.RequestOptions,
  data?: any
): Promise<T> =>
  new Promise(
    (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ): void => {
      const isMethodPost: boolean =
        options.method !== undefined &&
        options.method === "POST" &&
        data !== undefined;
      const dataStringify: string = isMethodPost ? JSON.stringify(data) : "";
      const httpClientRequest: http.ClientRequest = http
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
            appDebug("response.statusCode", response.statusCode);
            const chunks: any[] = [];
            response
              .setEncoding("utf8")
              .on("data", (chunk: any): void => {
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
      if (isMethodPost) {
        appDebug("post", dataStringify);
        httpClientRequest.write(dataStringify);
      }
      httpClientRequest.end((): void => {
        appDebug("end");
      });
    }
  );

export { request };
