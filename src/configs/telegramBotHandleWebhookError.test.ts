import { handleWebhookError } from "./telegramBotHandleWebhookError";

describe("telegramBotHandleWebhookError configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => {}),
    getState: jest.fn(() => {}),
    subscribe: jest.fn(() => () => {}),
    replaceReducer: jest.fn(() => {})
  };

  test("should handle", (): void => {
    const error: Error = new Error();
    expect(handleWebhookError(store, error)).toHaveBeenCalled();
  });
});
