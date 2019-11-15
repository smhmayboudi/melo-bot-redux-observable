import { IInlineQuery } from "../../types/telegramBot/inlineMode/iInlineQuery";

import { handleInlineQuery } from "./telegramBotHandleInlineQuery";

describe("telegramBotHandleInlineQuery configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    replaceReducer: jest.fn(() => {}),
    subscribe: jest.fn(() => jest.fn(() => {}))
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
    handleInlineQuery(store, inlineQuery);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
