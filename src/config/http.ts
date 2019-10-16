import * as debug from "debug";
import * as http from "http";
import * as url from "url";

import { IStateMessageQuery } from "../../types/iStateMessageQuery";

import * as env from "./env";
import { readiness } from "./kubernetesProbs";
import { Prometheus } from "./prometheus";
import { operate } from "./telegramBot";

const appDebug: debug.IDebugger = debug("app:config:http");

const answer200: (
  _request: http.IncomingMessage,
  response: http.ServerResponse
) => void = (
  _request: http.IncomingMessage,
  response: http.ServerResponse
): void => {
  const statusCode: number = 200;
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; version=0.0.4; charset=utf-8"
  });
  response.end((): void => {
    appDebug("end");
  });
};

const answer500: (
  _request: http.IncomingMessage,
  response: http.ServerResponse
) => void = (
  _request: http.IncomingMessage,
  response: http.ServerResponse
): void => {
  const statusCode: number = 500;
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; version=0.0.4; charset=utf-8"
  });
  response.end((): void => {
    appDebug("end");
  });
};

const answerBotToken: (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => void = (
  request: http.IncomingMessage,
  response: http.ServerResponse
): void => {
  const chunks: any[] = [];
  request
    .on("data", (chunk: any): void => {
      appDebug("data", chunk);
      chunks.push(chunk);
    })
    .on("end", (): void => {
      try {
        const body: any = JSON.parse(Buffer.concat(chunks).toString());
        appDebug("body", body);
        operate(body as IStateMessageQuery);
      } catch (error) {
        appDebug("error", error);
      }
    })
    .on("error", (error: Error): void => {
      appDebug("error", error);
    });
  const statusCode: number = 200;
  if (readiness) {
    response.writeHead(statusCode, { "Content-Type": "application/json" });
  } else {
    response.writeHead(statusCode, {
      Connection: "close",
      "Content-Type": "application/json"
    });
  }
  response.end((): void => {
    appDebug("end");
  });
};

const answerMetrics: (
  _request: http.IncomingMessage,
  response: http.ServerResponse
) => void = (
  _request: http.IncomingMessage,
  response: http.ServerResponse
): void => {
  const statusCode: number = 200;
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
              answer200(request, response);
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
    appDebug(`Server running at http://${env.HOSTNAME}:${env.PORT}`);
  });
