import * as debug from "debug";
import * as FormData from "form-data";
import * as http from "http";

const appDebug: debug.IDebugger = debug("app:lib:requestUpload");

const requestUpload:
  (options: http.RequestOptions, formData: FormData) => Promise<any> =
  async (options: http.RequestOptions, formData: FormData): Promise<any> =>
    new Promise((resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void): void => {
      const httpClientRequest: http.ClientRequest = http
        .request(
          {
            method: "POST",
            ...options,
            headers: {
              ...formData.getHeaders() as http.OutgoingHttpHeaders,
              ...options.headers,
            },
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
              })
              ;
          },
        )
        .on("error", (error: Error): void => {
          appDebug("error", error);
          reject(error);
        })
        ;
      formData.pipe(httpClientRequest);
    });

export { requestUpload };
