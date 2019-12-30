import { IInlineQuery } from "../../types/telegramBot/inlineMode/iInlineQuery";
import { handleInlineQuery } from "./telegramBotHandleInlineQuery";

describe("telegramBotHandleInlineQuery configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  const inlineQuery: IInlineQuery = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false,
      language_code: "en"
    },
    id: "",
    offset: "",
    query: ""
  };

  test("should handle", (): void => {
    handleInlineQuery(store, inlineQuery);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
