import debug from "debug";
import { InsertOneWriteOpResult, MongoClient } from "mongodb";
import { Store } from "redux";

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

  const connect = MongoClient.connect(env.MONGO_CLIENT_URI, {
    appname: env.MONGO_CLIENT_APPNAME,
    logger: appDebug,
    loggerLevel: env.MONGO_CLIENT_LOGGER_LEVEL,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const userId = id(message);

  const pCommandUI: Promise<IStateUndoInsert<
    IStateCommandUI
  > | null> = connect.then((value: MongoClient) => {
    return value
      .db(env.DB_NAME)
      .collection<IStateUndoInsert<IStateCommandUI>>("commandUI", {})
      .findOne({ userId }, { sort: { _id: -1 } });
  });

  const pLocales: Promise<ILocale> = locale(languageCode(message));

  Promise.all([pCommandUI, pLocales])
    .then(
      (values: [IStateUndoInsert<IStateCommandUI> | null, ILocale | null]) => {
        const commandUI: IStateUndoInsert<IStateCommandUI> | undefined =
          values[0] || undefined;
        const locales: ILocale = values[1] as ILocale;
        const store: Store<IState, IAction> =
          testStore || configureStore(locales, commandUI);

        store.subscribe(() => {
          const commandUI: IStateUndo<IStateCommandUI> = store.getState()
            .commandUI;
          connect.then((value: MongoClient) => {
            return value
              .db(env.DB_NAME)
              .collection<IStateUndoInsert<IStateCommandUI>>("commandUI", {})
              .insertOne({
                future: commandUI.future,
                past: commandUI.past,
                present: commandUI.present,
                userId
              })
              .then(
                (
                  value: InsertOneWriteOpResult<
                    IStateUndoInsert<IStateCommandUI> & { _id: any }
                  >
                ) => {
                  appDebug("value", value);
                }
              );
          });
        });

        store.dispatch(actions.message.query({ query: message }));

        if (message.callback_query !== undefined) {
          handleCallbackQuery(locales, store, message.callback_query);
        } else if (message.channel_post !== undefined) {
          handleChannelPost(locales, store, message.channel_post);
        } else if (message.chosen_inline_result !== undefined) {
          handleChosenInlineResult(
            locales,
            store,
            message.chosen_inline_result
          );
        } else if (message.edited_channel_post !== undefined) {
          handleEditedChannelPost(locales, store, message.edited_channel_post);
        } else if (message.edited_channel_post_text !== undefined) {
          handleEditedChannelPostText(
            locales,
            store,
            message.edited_channel_post_text
          );
        } else if (message.edited_channel_post_caption !== undefined) {
          handleEditedChannelPostCaption(
            locales,
            store,
            message.edited_channel_post_caption
          );
        } else if (message.edited_message !== undefined) {
          handleEditedMessage(locales, store, message.edited_message);
        } else if (message.edited_message_text !== undefined) {
          handleEditedMessageText(locales, store, message.edited_message_text);
        } else if (message.edited_message_caption !== undefined) {
          handleEditedMessageCaption(
            locales,
            store,
            message.edited_message_caption
          );
        } else if (message.error !== undefined) {
          handleError(locales, store, message.error);
        } else if (message.inline_query !== undefined) {
          handleInlineQuery(locales, store, message.inline_query);
        } else if (message.message !== undefined) {
          handleMessage(locales, store, message.message);
        } else if (message.polling_error !== undefined) {
          handlePollingError(locales, store, message.polling_error);
        } else if (message.pre_checkout_query !== undefined) {
          handlePreCheckoutQuery(locales, store, message.pre_checkout_query);
        } else if (message.shipping_query !== undefined) {
          handleShippingQuery(locales, store, message.shipping_query);
        } else if (message.webhook_error !== undefined) {
          handleWebhookError(locales, store, message.webhook_error);
        } else {
          handle(locales, store);
        }
      }
    )
    .catch((error: Error) => {
      appDebug("ERROR", error);
    });
};

export { operate };
