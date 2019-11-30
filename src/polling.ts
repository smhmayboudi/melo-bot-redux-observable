import debug from "debug";
import * as http from "http";
import TelegramBot from "node-telegram-bot-api";

import { IStateMessageQuery } from "../types/iStateMessageQuery";
import { IChosenInlineResult } from "../types/telegramBot/inlineMode/iChosenInlineResult";
import { IInlineQuery } from "../types/telegramBot/inlineMode/iInlineQuery";
import { IPreCheckoutQuery } from "../types/telegramBot/payments/iPreCheckoutQuery";
import { IShippingQuery } from "../types/telegramBot/payments/iShippingQuery";
import { ICallbackQuery } from "../types/telegramBot/types/iCallbackQuery";
import { IMessage } from "../types/telegramBot/types/iMessage";

import * as env from "./configs/env";

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
            } catch (error) {
              appDebug("ERROR", error);
            }
          });
      }
    )
    .on("error", (error: Error): void => {
      appDebug("ERROR", error);
    });
  httpClientRequest.write(JSON.stringify(data));
  httpClientRequest.end((): void => {
    appDebug("END");
  });
  httpClientRequest.on("response", (response: http.IncomingMessage): void => {
    appDebug("response.headers", response.headers);
  });
};

telegramBot.on(
  "message",
  (message: TelegramBot.Message, metadata: TelegramBot.Metadata): void => {
    appDebug("message:message", message);
    appDebug("message:metadata", metadata);
    switch (metadata.type) {
      case "text":
      case "animation":
      case "audio":
      case "channel_chat_created":
      case "contact":
      case "delete_chat_photo":
      case "document":
      case "game":
      case "group_chat_created":
      case "invoice":
      case "left_chat_member":
      case "location":
      case "migrate_from_chat_id":
      case "migrate_to_chat_id":
      case "new_chat_members":
      case "new_chat_photo":
      case "new_chat_title":
      case "passport_data":
      case "photo":
      case "pinned_message":
      case "sticker":
      case "successful_payment":
      case "supergroup_chat_created":
      case "video":
      case "video_note":
      case "voice":
        createHttpClientRequest({ message: message as IMessage, update_id: 0 });
        break;
      default:
    }
  }
);

telegramBot.on("callback_query", (query: TelegramBot.CallbackQuery): void => {
  appDebug("callback_query:query", query);
  createHttpClientRequest({
    callback_query: query as ICallbackQuery,
    update_id: 0
  });
});

telegramBot.on("inline_query", (query: TelegramBot.InlineQuery): void => {
  appDebug("inline_query:query", query);
  createHttpClientRequest({
    inline_query: query as IInlineQuery,
    update_id: 0
  });
});

telegramBot.on(
  "chosen_inline_result",
  (result: TelegramBot.ChosenInlineResult): void => {
    appDebug("chosen_inline_result:result", result);
    createHttpClientRequest({
      chosen_inline_result: result as IChosenInlineResult,
      update_id: 0
    });
  }
);

telegramBot.on("channel_post", (message: TelegramBot.Message): void => {
  appDebug("channel_post:message", message);
  createHttpClientRequest({ message: message as IMessage, update_id: 0 });
});
telegramBot.on("edited_message", (message: TelegramBot.Message): void => {
  appDebug("edited_message:message", message);
  createHttpClientRequest({ message: message as IMessage, update_id: 0 });
});
telegramBot.on("edited_message_text", (message: TelegramBot.Message): void => {
  appDebug("edited_message_text:message", message);
  createHttpClientRequest({ message: message as IMessage, update_id: 0 });
});
telegramBot.on(
  "edited_message_caption",
  (message: TelegramBot.Message): void => {
    appDebug("edited_message_caption:message", message);
    createHttpClientRequest({ message: message as IMessage, update_id: 0 });
  }
);
telegramBot.on("edited_channel_post", (message: TelegramBot.Message): void => {
  appDebug("edited_channel_post:message", message);
  createHttpClientRequest({ message: message as IMessage, update_id: 0 });
});
telegramBot.on(
  "edited_channel_post_text",
  (message: TelegramBot.Message): void => {
    appDebug("edited_channel_post_text:message", message);
    createHttpClientRequest({ message: message as IMessage, update_id: 0 });
  }
);
telegramBot.on(
  "edited_channel_post_caption",
  (message: TelegramBot.Message): void => {
    appDebug("edited_channel_post_caption:message", message);
    createHttpClientRequest({ message: message as IMessage, update_id: 0 });
  }
);

telegramBot.on("shipping_query", (query: TelegramBot.ShippingQuery): void => {
  appDebug("shipping_query:query", query);
  createHttpClientRequest({
    shipping_query: query as IShippingQuery,
    update_id: 0
  });
});

telegramBot.on(
  "pre_checkout_query",
  (query: TelegramBot.PreCheckoutQuery): void => {
    appDebug("pre_checkout_query:query", query);
    createHttpClientRequest({
      pre_checkout_query: query as IPreCheckoutQuery,
      update_id: 0
    });
  }
);

telegramBot.on("polling_error", (error: Error): void => {
  appDebug("polling_error:error", error);
  createHttpClientRequest({ error, update_id: 0 });
});
telegramBot.on("webhook_error", (error: Error): void => {
  appDebug("webhook_error:error", error);
  createHttpClientRequest({ error, update_id: 0 });
});
telegramBot.on("error", (error: Error): void => {
  appDebug("error:error", error);
  createHttpClientRequest({ error, update_id: 0 });
});
