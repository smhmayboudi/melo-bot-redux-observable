import { IChosenInlineResult } from "../../types/telegramBot/inlineMode/iChosenInlineResult";
import { handleChosenInlineResult } from "./telegramBotHandleChosenInlineResult";

describe("telegramBotHandleChosenInlineResult configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  const chosenInlineResult: IChosenInlineResult = {
    from: {
      first_name: "",
      id: 0,
      is_bot: false,
      language_code: "en"
    },
    query: "",
    result_id: ""
  };

  test("should handle", (): void => {
    handleChosenInlineResult(store, chosenInlineResult);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
