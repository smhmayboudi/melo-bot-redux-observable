import { IStateMessageQuery } from "../../types/iStateMessageQuery";

import { operate } from "./telegramBot";

describe("telegramBot configs", (): void => {
  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      callback_query: {
        chat_instance: "",
        from: {
          first_name: "",
          id: 0,
          is_bot: false
        },
        id: ""
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      channel_post: {
        chat: {
          id: 0,
          type: ""
        },
        date: 0,
        message_id: 0
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      chosen_inline_result: {
        from: {
          first_name: "",
          id: 0,
          is_bot: false
        },
        query: "",
        result_id: ""
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      edited_channel_post: {
        chat: {
          id: 0,
          type: ""
        },
        date: 0,
        message_id: 0
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      edited_channel_post_caption: {
        chat: {
          id: 0,
          type: ""
        },
        date: 0,
        message_id: 0
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      edited_channel_post_text: {
        chat: {
          id: 0,
          type: ""
        },
        date: 0,
        message_id: 0
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      edited_message: {
        chat: {
          id: 0,
          type: ""
        },
        date: 0,
        message_id: 0
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      edited_message_caption: {
        chat: {
          id: 0,
          type: ""
        },
        date: 0,
        message_id: 0
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      edited_message_text: {
        chat: {
          id: 0,
          type: ""
        },
        date: 0,
        message_id: 0
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      error: new Error(""),
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      inline_query: {
        from: {
          first_name: "",
          id: 0,
          is_bot: false
        },
        id: "",
        offset: "",
        query: ""
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      message: {
        chat: {
          id: 0,
          type: ""
        },
        date: 0,
        message_id: 0
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      polling_error: new Error(""),
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      pre_checkout_query: {
        currency: "",
        from: {
          first_name: "",
          id: 0,
          is_bot: false
        },
        id: "",
        invoice_payload: "",
        total_amount: 0
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      shipping_query: {
        from: {
          first_name: "",
          id: 0,
          is_bot: false
        },
        id: "",
        invoice_payload: "",
        shipping_address: {
          city: "",
          country_code: "",
          post_code: "",
          state: "",
          street_line1: "",
          street_line2: ""
        }
      },
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      webhook_error: new Error(""),
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });

  test("should handle", (): void => {
    const message: IStateMessageQuery = {
      update_id: 0
    };
    expect(operate(message)).toHaveBeenCalled();
  });
});
