import { IChosenInlineResult } from "../../types/telegramBot/inlineMode/iChosenInlineResult";

import { handleChosenInlineResult } from "./telegramBotHandleChosenInlineResult";

describe("telegramBotHandleChosenInlineResult configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    replaceReducer: jest.fn(() => {}),
    subscribe: jest.fn(() => jest.fn(() => {}))
  };

  test("should handle", (): void => {
    const chosenInlineResult: IChosenInlineResult = {
      from: {
        first_name: "",
        id: 0,
        is_bot: false
      },
      query: "",
      result_id: ""
    };
    expect(
      handleChosenInlineResult(store, chosenInlineResult)
    ).toHaveBeenCalled();
  });
});
