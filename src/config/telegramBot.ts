import debug from "debug";
import { MongoClient } from "mongodb";
import { Store } from "redux";
import { Observable } from "rxjs";

import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import * as actions from "../actions";
import {
  collectionObservable,
  connectObservable,
  findOneObservable,
  insertOneObservable
} from "../lib/mongodbObservable";
import { requestObservable } from "../lib/requestObservable";
import { requestsObservable } from "../lib/requestsObservable";
import { requestsUploadObservable } from "../lib/requestsUploadObservable";
import { requestUploadObservable } from "../lib/requestUploadObservable";
import { youtubeDownloadObservable } from "../lib/youtubeDownloadObservable";

import * as env from "./env";
import { configureStore } from "./store";
import { handleCallbackQuery } from "./telegramBotHandleCallbackQuery";
import { handleChanelPost } from "./telegramBotHandleChanelPost";
import { handleChosenInlineResult } from "./telegramBotHandleChosenInlineResult";
import { handleEditedChannelPost } from "./telegramBotHandleEditedChannelPost";
import { handleEditedChannelPostCaption } from "./telegramBotHandleEditedChannelPostCaption";
import { handleEditedChannelPostText } from "./telegramBotHandleEditedChannelPostText";
import { handleEditedMessage } from "./telegramBotHandleEditedMessage";
import { handleEditedMessageCaption } from "./telegramBotHandleEditedMessageCaption";
import { handleEditedMessageText } from "./telegramBotHandleEditedMessageText";
import { handleError } from "./telegramBotHandleError";
import { handleInlineQuery } from "./telegramBotHandleInlineQuery";
import { handleMessage } from "./telegramBotHandleMessage";
import { handlePollingError } from "./telegramBotHandlePollingError";
import { handlePreCheckoutQuery } from "./telegramBotHandlePreCheckoutQuery";
import { handleShippingQuery } from "./telegramBotHandleShippingQuery";
import { handleWebhookError } from "./telegramBotHandleWebhookError";

const appDebug: debug.IDebugger = debug("app:config:telegramBot");

const operate: (message: IStateMessageQuery) => void = (
  message: IStateMessageQuery
): void => {
  const mongoClientObservable: () => Observable<MongoClient> = (): Observable<
    MongoClient
  > =>
    connectObservable(env.MONGO_CLIENT_URI, {
      appname: env.MONGO_CLIENT_APPNAME,
      logger: appDebug,
      loggerLevel: env.MONGO_CLIENT_LOGGER_LEVEL,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  const store: Store<IState> & { dispatch: {} } = configureStore({
    botToken: env.BOT_TOKEN,
    collectionObservable,
    findOneObservable,
    insertOneObservable,
    mongoClientObservable,
    requestObservable,
    requestUploadObservable,
    requestsObservable,
    requestsUploadObservable,
    youtubeDownloadObservable
  });
  store.dispatch(actions.message.query({ query: message }));
  if (message.callback_query !== undefined) {
    handleCallbackQuery(store, message.callback_query);
  } else if (message.channel_post !== undefined) {
    handleChanelPost(store, message.channel_post);
  } else if (message.chosen_inline_result !== undefined) {
    handleChosenInlineResult(store, message.chosen_inline_result);
  } else if (message.edited_channel_post !== undefined) {
    handleEditedChannelPost(store, message.edited_channel_post);
  } else if (message.edited_channel_post_text !== undefined) {
    handleEditedChannelPostText(store, message.edited_channel_post_text);
  } else if (message.edited_channel_post_caption !== undefined) {
    handleEditedChannelPostCaption(store, message.edited_channel_post_caption);
  } else if (message.edited_message !== undefined) {
    handleEditedMessage(store, message.edited_message);
  } else if (message.edited_message_text !== undefined) {
    handleEditedMessageText(store, message.edited_message_text);
  } else if (message.edited_message_caption !== undefined) {
    handleEditedMessageCaption(store, message.edited_message_caption);
  } else if (message.error !== undefined) {
    handleError(store, message.error);
  } else if (message.inline_query !== undefined) {
    handleInlineQuery(store, message.inline_query);
  } else if (message.message !== undefined) {
    handleMessage(store, message.message);
  } else if (message.polling_error !== undefined) {
    handlePollingError(store, message.polling_error);
  } else if (message.pre_checkout_query !== undefined) {
    handlePreCheckoutQuery(store, message.pre_checkout_query);
  } else if (message.shipping_query !== undefined) {
    handleShippingQuery(store, message.shipping_query);
  } else if (message.webhook_error !== undefined) {
    handleWebhookError(store, message.webhook_error);
  }
};

export { operate };
