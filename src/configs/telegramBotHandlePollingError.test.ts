import { handlePollingError } from "./telegramBotHandlePollingError";

describe("telegramBotHandlePollingError configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  const error: Error = new Error("");

  test("should handle", (): void => {
    handlePollingError(store, error);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
