import { Store } from "redux";

import { IAction } from "../../types/iAction";
import { ILocale } from "../../types/iLocale";
import { IState } from "../../types/iState";
import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import * as actions from "../actions";
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

const operate: (
  message: IStateMessageQuery,
  testStore?: Store<IState, IAction>
) => void = (
  message: IStateMessageQuery,
  testStore?: Store<IState, IAction>
): void => {
  let pLocales: Promise<ILocale> = locale("en");
  if (
    message.chosen_inline_result !== undefined &&
    message.chosen_inline_result.from !== undefined &&
    message.chosen_inline_result.from.language_code !== undefined
  ) {
    pLocales = locale(message.chosen_inline_result.from.language_code);
  }
  if (
    message.callback_query !== undefined &&
    message.callback_query.from !== undefined &&
    message.callback_query.from.language_code !== undefined
  ) {
    pLocales = locale(message.callback_query.from.language_code);
  }
  if (
    message.inline_query !== undefined &&
    message.inline_query.from !== undefined &&
    message.inline_query.from.language_code !== undefined
  ) {
    pLocales = locale(message.inline_query.from.language_code);
  }
  if (
    message.message !== undefined &&
    message.message.from !== undefined &&
    message.message.from.language_code !== undefined
  ) {
    pLocales = locale(message.message.from.language_code);
  }
  if (
    message.pre_checkout_query !== undefined &&
    message.pre_checkout_query.from !== undefined &&
    message.pre_checkout_query.from.language_code !== undefined
  ) {
    pLocales = locale(message.pre_checkout_query.from.language_code);
  }
  if (
    message.shipping_query !== undefined &&
    message.shipping_query.from !== undefined &&
    message.shipping_query.from.language_code !== undefined
  ) {
    pLocales = locale(message.shipping_query.from.language_code);
  }
  Promise.all([pLocales]).then((values: ILocale[]) => {
    const locales: ILocale = values[0];
    const store: Store<IState, IAction> =
      testStore !== undefined ? testStore : configureStore(locales);
    store.dispatch(actions.message.query({ query: message }));
    if (message.callback_query !== undefined) {
      handleCallbackQuery(locales, store, message.callback_query);
    } else if (message.channel_post !== undefined) {
      handleChannelPost(locales, store, message.channel_post);
    } else if (message.chosen_inline_result !== undefined) {
      handleChosenInlineResult(locales, store, message.chosen_inline_result);
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
  });
};

export { operate };
