import { handle } from "./telegramBotHandle";

describe("telegramBotHandle configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    replaceReducer: jest.fn(() => {}),
    subscribe: jest.fn(() => jest.fn(() => {}))
  };

  test("should handle", (): void => {
    handle(store);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
