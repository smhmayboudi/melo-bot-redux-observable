import { IInlineQuery } from "../../types/telegramBot/inlineMode/iInlineQuery";

import { handleInlineQuery } from "./telegramBotHandleInlineQuery";

describe("telegramBotHandleInlineQuery configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    subscribe: jest.fn(() => () => {}),
    replaceReducer: jest.fn(() => {})
  };

  test("should handle", (): void => {
    const inlineQuery: IInlineQuery = {
      from: {
        first_name: "",
        id: 0,
        is_bot: false
      },
      id: "",
      offset: "",
      query: ""
    };
    expect(handleInlineQuery(store, inlineQuery)).toHaveBeenCalled();
  });
});
