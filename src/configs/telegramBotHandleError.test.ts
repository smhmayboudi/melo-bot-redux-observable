import { handleError } from "./telegramBotHandleError";

describe("telegramBotHandleError configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  const error: Error = new Error("");

  test("should handle", (): void => {
    handleError(store, error);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
