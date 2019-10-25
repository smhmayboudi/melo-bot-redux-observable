import { handlePollingError } from "./telegramBotHandlePollingError";

describe("telegramBotHandlePollingError configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    subscribe: jest.fn(() => () => {}),
    replaceReducer: jest.fn(() => {})
  };

  test("should handle", (): void => {
    const error: Error = new Error();
    expect(handlePollingError(store, error)).toHaveBeenCalled();
  });
});
