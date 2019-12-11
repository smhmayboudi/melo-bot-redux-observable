import { ILocale } from "../../types/iLocale";
import { locale } from "../utils/string";
import { handlePollingError } from "./telegramBotHandlePollingError";

describe("telegramBotHandlePollingError configs", (): void => {
  const locales: ILocale = locale("en");
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  test("should handle", (): void => {
    const error: Error = new Error("");
    handlePollingError(locales, store, error);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
