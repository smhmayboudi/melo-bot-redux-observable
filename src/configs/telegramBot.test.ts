// import { IStateMessageQuery } from "../../types/iStateMessageQuery";

// import { operate } from "./telegramBot";

describe("telegramBot configs", (): void => {
  // const store: any = {
  //   dispatch: jest.fn(() => {}),
  //   getState: jest.fn(() => {}),
  //   replaceReducer: jest.fn(() => {}),
  //   subscribe: jest.fn(() => jest.fn(() => {}))
  // };

  test("should handle callback_query", (): void => {
    // const message: IStateMessageQuery = {
    //   callback_query: {
    //     chat_instance: "",
    //     from: {
    //       first_name: "",
    //       id: 0,
    //       is_bot: false
    //     },
    //     id: ""
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle channel_post", (): void => {
    // const message: IStateMessageQuery = {
    //   channel_post: {
    //     chat: {
    //       id: 0,
    //       type: ""
    //     },
    //     date: 0,
    //     message_id: 0
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle chosen_inline_result", (): void => {
    // const message: IStateMessageQuery = {
    //   chosen_inline_result: {
    //     from: {
    //       first_name: "",
    //       id: 0,
    //       is_bot: false
    //     },
    //     query: "",
    //     result_id: ""
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle edited_channel_post", (): void => {
    // const message: IStateMessageQuery = {
    //   edited_channel_post: {
    //     chat: {
    //       id: 0,
    //       type: ""
    //     },
    //     date: 0,
    //     message_id: 0
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle edited_channel_post_caption", (): void => {
    // const message: IStateMessageQuery = {
    //   edited_channel_post_caption: {
    //     chat: {
    //       id: 0,
    //       type: ""
    //     },
    //     date: 0,
    //     message_id: 0
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle edited_channel_post_text", (): void => {
    // const message: IStateMessageQuery = {
    //   edited_channel_post_text: {
    //     chat: {
    //       id: 0,
    //       type: ""
    //     },
    //     date: 0,
    //     message_id: 0
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle edited_message", (): void => {
    // const message: IStateMessageQuery = {
    //   edited_message: {
    //     chat: {
    //       id: 0,
    //       type: ""
    //     },
    //     date: 0,
    //     message_id: 0
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle edited_message_caption", (): void => {
    // const message: IStateMessageQuery = {
    //   edited_message_caption: {
    //     chat: {
    //       id: 0,
    //       type: ""
    //     },
    //     date: 0,
    //     message_id: 0
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle edited_message_text", (): void => {
    // const message: IStateMessageQuery = {
    //   edited_message_text: {
    //     chat: {
    //       id: 0,
    //       type: ""
    //     },
    //     date: 0,
    //     message_id: 0
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle error", (): void => {
    // const message: IStateMessageQuery = {
    //   error: new Error(""),
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle inline_query", (): void => {
    // const message: IStateMessageQuery = {
    //   inline_query: {
    //     from: {
    //       first_name: "",
    //       id: 0,
    //       is_bot: false
    //     },
    //     id: "",
    //     offset: "",
    //     query: ""
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle message", (): void => {
    // const message: IStateMessageQuery = {
    //   message: {
    //     chat: {
    //       id: 0,
    //       type: ""
    //     },
    //     date: 0,
    //     message_id: 0
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle polling_error", (): void => {
    // const message: IStateMessageQuery = {
    //   polling_error: new Error(""),
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle pre_checkout_query", (): void => {
    // const message: IStateMessageQuery = {
    //   pre_checkout_query: {
    //     currency: "",
    //     from: {
    //       first_name: "",
    //       id: 0,
    //       is_bot: false
    //     },
    //     id: "",
    //     invoice_payload: "",
    //     total_amount: 0
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle shipping_query", (): void => {
    // const message: IStateMessageQuery = {
    //   shipping_query: {
    //     from: {
    //       first_name: "",
    //       id: 0,
    //       is_bot: false
    //     },
    //     id: "",
    //     invoice_payload: "",
    //     shipping_address: {
    //       city: "",
    //       country_code: "",
    //       post_code: "",
    //       state: "",
    //       street_line1: "",
    //       street_line2: ""
    //     }
    //   },
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle webhook_error", (): void => {
    // const message: IStateMessageQuery = {
    //   update_id: 0,
    //   webhook_error: new Error("")
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    // const message: IStateMessageQuery = {
    //   update_id: 0
    // };
    // operate(message);
    // expect(store.dispatch).toHaveBeenCalled();
  });
});
