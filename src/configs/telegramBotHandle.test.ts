import { handle } from "./telegramBotHandle";

describe("telegramBotHandle configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    replaceReducer: jest.fn(() => {}),
    subscribe: jest.fn(() => () => {})
  };

  test("should handle", (): void => {
    expect(handle(store)).toHaveBeenCalled();
  });
});
