import { ILocale } from "../../types/iLocale";
import { locale } from "../utils/string";
import { handle } from "./telegramBotHandle";

describe("telegramBotHandle configs", (): void => {
  const store: any = {
    dispatch: jest.fn(() => ({})),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(() => ({})),
    subscribe: jest.fn(() => jest.fn(() => ({})))
  };

  let locales: ILocale;

  beforeAll(
    async (): Promise<void> => {
      locales = await locale("en");
    }
  );

  test("should handle", (): void => {
    handle(locales, store);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
