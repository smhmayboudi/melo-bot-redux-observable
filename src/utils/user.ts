import { IStateMessageQuery } from "../../types/iStateMessageQuery";

const id: (message?: IStateMessageQuery) => number = (
  message?: IStateMessageQuery
): number => {
  if (
    message !== undefined &&
    message.chosen_inline_result !== undefined &&
    message.chosen_inline_result.from !== undefined
  ) {
    return message.chosen_inline_result.from.id;
  }
  if (
    message !== undefined &&
    message.callback_query !== undefined &&
    message.callback_query.from !== undefined
  ) {
    return message.callback_query.from.id;
  }
  if (
    message !== undefined &&
    message.inline_query !== undefined &&
    message.inline_query.from !== undefined
  ) {
    return message.inline_query.from.id;
  }
  if (
    message !== undefined &&
    message.message !== undefined &&
    message.message.from !== undefined
  ) {
    return message.message.from.id;
  }
  if (
    message !== undefined &&
    message.pre_checkout_query !== undefined &&
    message.pre_checkout_query.from !== undefined
  ) {
    return message.pre_checkout_query.from.id;
  }
  if (
    message !== undefined &&
    message.shipping_query !== undefined &&
    message.shipping_query.from !== undefined
  ) {
    return message.shipping_query.from.id;
  }
  return 0;
};

const languageCode: (message?: IStateMessageQuery) => string = (
  message?: IStateMessageQuery
): string => {
  if (
    message !== undefined &&
    message.chosen_inline_result !== undefined &&
    message.chosen_inline_result.from !== undefined &&
    message.chosen_inline_result.from.language_code !== undefined
  ) {
    return message.chosen_inline_result.from.language_code;
  }
  if (
    message !== undefined &&
    message.callback_query !== undefined &&
    message.callback_query.from !== undefined &&
    message.callback_query.from.language_code !== undefined
  ) {
    return message.callback_query.from.language_code;
  }
  if (
    message !== undefined &&
    message.inline_query !== undefined &&
    message.inline_query.from !== undefined &&
    message.inline_query.from.language_code !== undefined
  ) {
    return message.inline_query.from.language_code;
  }
  if (
    message !== undefined &&
    message.message !== undefined &&
    message.message.from !== undefined &&
    message.message.from.language_code !== undefined
  ) {
    return message.message.from.language_code;
  }
  if (
    message !== undefined &&
    message.pre_checkout_query !== undefined &&
    message.pre_checkout_query.from !== undefined &&
    message.pre_checkout_query.from.language_code !== undefined
  ) {
    return message.pre_checkout_query.from.language_code;
  }
  if (
    message !== undefined &&
    message.shipping_query !== undefined &&
    message.shipping_query.from !== undefined &&
    message.shipping_query.from.language_code !== undefined
  ) {
    return message.shipping_query.from.language_code;
  }
  return "en";
};

const username: (message?: IStateMessageQuery) => string = (
  message?: IStateMessageQuery
): string => {
  if (
    message !== undefined &&
    message.chosen_inline_result !== undefined &&
    message.chosen_inline_result.from !== undefined &&
    message.chosen_inline_result.from.username !== undefined
  ) {
    return message.chosen_inline_result.from.username;
  }
  if (
    message !== undefined &&
    message.callback_query !== undefined &&
    message.callback_query.from !== undefined &&
    message.callback_query.from.username !== undefined
  ) {
    return message.callback_query.from.username;
  }
  if (
    message !== undefined &&
    message.inline_query !== undefined &&
    message.inline_query.from !== undefined &&
    message.inline_query.from.username !== undefined
  ) {
    return message.inline_query.from.username;
  }
  if (
    message !== undefined &&
    message.message !== undefined &&
    message.message.from !== undefined &&
    message.message.from.username !== undefined
  ) {
    return message.message.from.username;
  }
  if (
    message !== undefined &&
    message.pre_checkout_query !== undefined &&
    message.pre_checkout_query.from !== undefined &&
    message.pre_checkout_query.from.username !== undefined
  ) {
    return message.pre_checkout_query.from.username;
  }
  if (
    message !== undefined &&
    message.shipping_query !== undefined &&
    message.shipping_query.from !== undefined &&
    message.shipping_query.from.username !== undefined
  ) {
    return message.shipping_query.from.username;
  }
  return "";
};

export { id, languageCode, username };
