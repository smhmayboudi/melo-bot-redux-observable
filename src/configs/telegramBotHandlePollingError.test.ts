import { handlePollingError } from "./telegramBotHandlePollingError";

describe("telegramBotHandlePollingError configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  test("should handle", (): void => {
    const error: Error = new Error("");
    handlePollingError(store, error);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
