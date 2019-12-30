import debug from "debug";
import { Connection, createConnection } from "mariadb";
import { MongoClient, UpdateWriteOpResult } from "mongodb";
import { Store } from "redux";
import { throttle } from "lodash";

import { IAction } from "../../types/iAction";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateCommandUI } from "../../types/iStateCommandUI";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import { IStateUndo } from "../../types/iStateUndo";
import { IStateUndoInsert } from "../../types/iStateUndoInsert";
import * as actions from "../actions";
import * as env from "../configs/env";
import { locale } from "../utils/string";
import { configureStore } from "./store";
import { handle } from "./telegramBotHandle";
import { handleCallbackQuery } from "./telegramBotHandleCallbackQuery";
import { handleChannelPost } from "./telegramBotHandleChannelPost";
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

import { id, languageCode } from "../utils/user";

const operate: (
  message: IStateMessageQuery,
  testStore?: Store<IState, IAction>
) => void = (
  message: IStateMessageQuery,
  testStore?: Store<IState, IAction>
): void => {
  const appDebug: debug.IDebugger = debug("app:configs:telegramBot");

  const pMariaClient: Promise<Connection> = createConnection(
    env.MARIA_CLIENT_URI
  );

  const pMngoClient: Promise<MongoClient> = MongoClient.connect(
    env.MONGO_CLIENT_URI,
    {
      appname: env.MONGO_CLIENT_APPNAME,
      logger: appDebug,
      loggerLevel: env.MONGO_CLIENT_LOGGER_LEVEL,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const userId = id(message);

  const pCommandUI: Promise<IStateUndoInsert<
    IStateCommandUI
  > | null> = pMngoClient.then((value: MongoClient) =>
    value
      .db(env.DB_NAME)
      .collection<IStateUndoInsert<IStateCommandUI>>("commandUI", {})
      .findOne({ userId }, { sort: { _id: -1 } })
      .catch((error: Error) => {
        appDebug("ERROR", error);
        return {
          future: [],
          past: [],
          present: {},
          userId: 0
        };
      })
  );

  const pLocales: Promise<ILocale> = locale(languageCode(message));

  Promise.all([pCommandUI, pLocales, pMariaClient, pMngoClient])
    .then(
      (
        values: [
          IStateUndoInsert<IStateCommandUI> | null,
          ILocale | null,
          Connection | null,
          MongoClient | null
        ]
      ) => {
        const commandUI: IStateUndoInsert<IStateCommandUI> | null = values[0];
        const locales: ILocale = values[1] as ILocale;
        const mariaClient: Connection = values[2] as Connection;
        const mongoClient: MongoClient = values[3] as MongoClient;

        const store: Store<IState, IAction> =
          testStore ||
          configureStore(commandUI, locales, mariaClient, mongoClient);

        store.subscribe(
          throttle((): void => {
            const commandUI: IStateUndo<IStateCommandUI> = store.getState()
              .commandUI;
            pMngoClient
              .then((value: MongoClient) =>
                value
                  .db(env.DB_NAME)
                  .collection<IStateUndoInsert<IStateCommandUI>>(
                    "commandUI",
                    {}
                  )
                  .replaceOne(
                    { userId },
                    {
                      future: commandUI.future,
                      past: commandUI.past,
                      present: commandUI.present,
                      userId
                    },
                    {
                      upsert: true
                    }
                  )
                  .then((valueUpdateOne: UpdateWriteOpResult) => {
                    appDebug("value", valueUpdateOne);
                  })
                  .catch((error: Error) => {
                    appDebug("ERROR", error);
                  })
              )
              .catch((error: Error) => {
                appDebug("ERROR", error);
              });
          }, 1000)
        );

        store.dispatch(actions.message.query({ query: message }));

        if (message.callback_query !== undefined) {
          handleCallbackQuery(store, message.callback_query);
        } else if (message.channel_post !== undefined) {
          handleChannelPost(store, message.channel_post);
        } else if (message.chosen_inline_result !== undefined) {
          handleChosenInlineResult(store, message.chosen_inline_result);
        } else if (message.edited_channel_post !== undefined) {
          handleEditedChannelPost(store, message.edited_channel_post);
        } else if (message.edited_channel_post_text !== undefined) {
          handleEditedChannelPostText(store, message.edited_channel_post_text);
        } else if (message.edited_channel_post_caption !== undefined) {
          handleEditedChannelPostCaption(
            store,
            message.edited_channel_post_caption
          );
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
        } else {
          handle(store);
        }
      }
    )
    .catch((error: Error) => {
      appDebug("ERROR", error);
    });
};

export { operate };
