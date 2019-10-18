import debug from "debug";
import * as http from "http";
import TelegramBot from "node-telegram-bot-api";

import { IStateMessageQuery } from "../types/iStateMessageQuery";
import { IInlineQuery } from "../types/telegramBot/inlineMode/iInlineQuery";
import { ICallbackQuery } from "../types/telegramBot/types/iCallbackQuery";
import { IMessage } from "../types/telegramBot/types/iMessage";

import * as env from "./config/env";

const appDebug: debug.IDebugger = debug("app:polling");

const telegramBot: TelegramBot = new TelegramBot(env.BOT_TOKEN, {
  polling: true
});
const createHttpClientRequest: (data: IStateMessageQuery) => void = (
  data: IStateMessageQuery
): void => {
  const httpClientRequest: http.ClientRequest = http
    .request(
      {
        headers: { "Content-Type": "application/json", "User-Agent": "node" },
        host: env.HOSTNAME,
        method: "POST",
        path: `/${env.BOT_TOKEN}`,
        port: env.PORT
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
            } catch (error) {
              appDebug("error", error);
            }
          });
      }
    )
    .on("error", (error: Error): void => {
      appDebug("error", error);
    });
  httpClientRequest.write(JSON.stringify(data));
  httpClientRequest.end((): void => {
    appDebug("end");
  });
  httpClientRequest.once("response", (response: http.IncomingMessage): void => {
    // The server response { "Connection": "close" } when readiness is false.
    appDebug("response.headers", response.headers);
  });
};

telegramBot.on("contact", (message: IMessage): void => {
  createHttpClientRequest({ message, update_id: 0 });
});
telegramBot.on("inline_query", (inlineQuery: IInlineQuery): void => {
  createHttpClientRequest({ inline_query: inlineQuery, update_id: 0 });
});
telegramBot.on("callback_query", (callbackQuery: ICallbackQuery): void => {
  createHttpClientRequest({ callback_query: callbackQuery, update_id: 0 });
});
telegramBot.on("text", (message: IMessage): void => {
  createHttpClientRequest({ message, update_id: 0 });
});
telegramBot.on("voice", (message: IMessage): void => {
  createHttpClientRequest({ message, update_id: 0 });
});
