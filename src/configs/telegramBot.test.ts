import { IStateMessageQuery } from "../../types/iStateMessageQuery";

import { operate } from "./telegramBot";

describe("telegramBot configs", (): void => {
  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      // Callback_query?: ICallbackQuery,
      // Channel_post?: IMessage,
      // Chosen_inline_result?: IChosenInlineResult,
      // Edited_channel_post?: IMessage,
      // Edited_channel_post_caption?: IMessage,
      // Edited_channel_post_text?: IMessage,
      // Edited_message?: IMessage,
      // Edited_message_caption?: IMessage,
      // Edited_message_text?: IMessage,
      // Error?: Error,
      // Inline_query?: IInlineQuery,
      // Message?: IMessage,
      // Polling_error?: Error,
      // Pre_checkout_query?: IPreCheckoutQuery,
      // Shipping_query?: IShippingQuery,
      update_id: 0
      // Webhook_error?: Error
    };
    expect(operate(message)).toHaveBeenCalled();
  });
});
