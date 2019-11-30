import debug from "debug";
import * as http from "http";
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

http
  .createServer(
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
  .listen(env.PORT, env.HOSTNAME, (): void => {
    appDebug("SERVER_RUNNING", env.HOSTNAME, env.PORT);
  });
