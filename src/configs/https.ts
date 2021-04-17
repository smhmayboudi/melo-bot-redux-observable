import debug from "debug";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import * as path from "path";
import * as url from "url";

import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import * as env from "./env";
import { liveness, readiness } from "./kubernetesProbs";
import { Prometheus } from "./prometheus";
import { operate } from "./telegramBot";

const appDebug: debug.IDebugger = debug("app:config:http");

const answer200: (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => void = (
  _request: http.IncomingMessage,
  response: http.ServerResponse
): void => {
  const statusCode = 200;
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; version=0.0.4; charset=utf-8"
  });
  response.end((): void => {
    appDebug("END");
  });
};

const answer500: (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => void = (
  _request: http.IncomingMessage,
  response: http.ServerResponse
): void => {
  const statusCode = 500;
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; version=0.0.4; charset=utf-8"
  });
  response.end((): void => {
    appDebug("END");
  });
};

const answerBotToken: (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => void = (
  request: http.IncomingMessage,
  response: http.ServerResponse
): void => {
  const chunks: Uint8Array[] = [];
  request
    .on("data", (chunk: Uint8Array): void => {
      appDebug("DATA", chunk);
      chunks.push(chunk);
    })
    .on("end", (): void => {
      try {
        const body: any = JSON.parse(Buffer.concat(chunks).toString());
        appDebug("BODY", body);
        operate(body as IStateMessageQuery);
      } catch (error) {
        appDebug("ERROR", error);
      }
    })
    .on("error", (error: Error): void => {
      appDebug("ERROR", error);
    });
  const statusCode = 200;
  if (readiness) {
    response.writeHead(statusCode, { "Content-Type": "application/json" });
  } else {
    response.writeHead(statusCode, {
      Connection: "close",
      "Content-Type": "application/json"
    });
  }
  response.end((): void => {
    appDebug("END");
  });
};

const answerMetrics: (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => void = (
  _request: http.IncomingMessage,
  response: http.ServerResponse
): void => {
  const statusCode = 200;
  response.writeHead(statusCode, {
    "Content-Type": Prometheus.register.contentType
  });
  response.end(Prometheus.register.metrics());
};

https
  .createServer(
    {
      // ALPNProtocols?: string[] | Buffer[] | Uint8Array[] | Buffer | Uint8Array;
      // ca?: string | Buffer | Array<string | Buffer>;
      // ca: [
      //   // This is necessary only if the client uses a self-signed certificate.
      //   fs.readFileSync(path.resolve(__dirname, "../../", "client-cert.pem"))
      // ],
      // cert?: string | Buffer | Array<string | Buffer>;
      cert: fs.readFileSync(
        path.resolve(__dirname, "../../", "YOURPUBLIC.pem")
      ),
      // ciphers?: string;
      // clientCertEngine?: string;
      // crl?: string | Buffer | Array<string | Buffer>;
      // dhparam?: string | Buffer;
      // ecdhCurve?: string;
      // handshakeTimeout?: number;
      // honorCipherOrder?: boolean;
      // key?: string | Buffer | Array<Buffer | Object>;
      key: fs.readFileSync(path.resolve(__dirname, "../../", "YOURPRIVATE.key"))
      // NPNProtocols?: string[] | Buffer[] | Uint8Array[] | Buffer | Uint8Array;
      // passphrase?: string;
      // pfx?: string | Buffer | Array<string | Buffer | Object>;
      // rejectUnauthorized?: boolean;
      // requestCert?: boolean;
      // secureOptions?: number; // Value is a numeric bitmask of the `SSL_OP_*` options
      // secureProtocol?: string; // SSL Method, e.g. SSLv23_method
      // sessionIdContext?: string;
      // sessionTimeout?: number;
      // SNICallback?: (servername: string, cb: (err: Error | null, ctx: SecureContext) => void) => void;
      // ticketKeys?: Buffer;
    },
    (request: http.IncomingMessage, response: http.ServerResponse): void => {
      if (request.url !== undefined) {
        const requestUrl: url.UrlWithStringQuery = url.parse(request.url);
        if (requestUrl.pathname !== undefined) {
          switch (requestUrl.pathname) {
            case `/${env.BOT_TOKEN}`:
              answerBotToken(request, response);
              break;
            case "/liveness":
              if (liveness) {
                answer200(request, response);
              } else {
                answer500(request, response);
              }
              break;
            case "/metrics":
              answerMetrics(request, response);
              break;
            case "/readiness":
              if (readiness) {
                answer200(request, response);
              } else {
                answer500(request, response);
              }
              break;
            default:
              answer500(request, response);
          }
        }
      }
    }
  )
  .listen(env.PORT_SECURE, env.HOSTNAME, (): void => {
    appDebug("SERVER_RUNNING", env.HOSTNAME, env.PORT_SECURE);
  });
