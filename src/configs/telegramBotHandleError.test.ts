import { ILocale } from "../../types/iLocale";
import { locale } from "../utils/string";
import { handleError } from "./telegramBotHandleError";

describe("telegramBotHandleError configs", (): void => {
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
    handleError(locales, store, error);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
