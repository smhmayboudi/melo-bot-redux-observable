import * as debug from "debug";
import * as http from "http";
import * as https from "https";

const appDebug: debug.IDebugger = debug("app:lib:requests");

const requests: (
  options: https.RequestOptions,
  data?: any
) => Promise<any> = async (
  options: https.RequestOptions,
  data?: any
): Promise<any> =>
  new Promise(
    (
      resolve: (value?: any | PromiseLike<any>) => void,
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
              ...(): any =>
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
                  resolve(body);
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

export { requests };
