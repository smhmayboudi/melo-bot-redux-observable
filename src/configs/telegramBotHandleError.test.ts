import { handleError } from "./telegramBotHandleError";

describe("telegramBotHandleError configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    replaceReducer: jest.fn(() => {}),
    subscribe: jest.fn(() => jest.fn(() => {}))
  };

  test("should handle", (): void => {
    const error: Error = new Error("");
    handleError(store, error);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
