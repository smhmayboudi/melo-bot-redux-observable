import { ILocale } from "../../types/iLocale";
import { locale } from "../utils/string";
import { handleWebhookError } from "./telegramBotHandleWebhookError";

describe("telegramBotHandleWebhookError configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  const error: Error = new Error("");

  let locales: ILocale;

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
    }
  );

  test("should handle", (): void => {
    handleWebhookError(locales, store, error);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
