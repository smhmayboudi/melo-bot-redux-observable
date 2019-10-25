import { handleError } from "./telegramBotHandleError";

describe("telegramBotHandleError configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    subscribe: jest.fn(() => () => {}),
    replaceReducer: jest.fn(() => {})
  };

  test("should handle", (): void => {
    const error: Error = new Error();
    expect(handleError(store, error)).toHaveBeenCalled();
  });
});
