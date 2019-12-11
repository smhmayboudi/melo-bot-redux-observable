import { IAction } from "../../types/iAction";
import { ILocale } from "../../types/iLocale";
import { locale } from "../utils/string";
import { init as authorization } from "./authorization";

describe("authorization middleware", (): void => {
  const locales: ILocale = locale("en");
  const create: () => {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
      replaceReducer: jest.Mock;
      subscribe: jest.Mock;
    };
    invoke(action: IAction): IAction;
  } = (): {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
      replaceReducer: jest.Mock;
      subscribe: jest.Mock;
    };
    invoke(action: IAction): IAction;
  } => {
    const next: jest.Mock = jest.fn();
    const store: any = {
      dispatch: jest.fn(),
      getState: jest.fn(() => ({})),
      replaceReducer: jest.fn(() => ({})),
      subscribe: jest.fn(() => jest.fn(() => ({})))
    };
    const invoke: (action: IAction) => IAction = (action: IAction): IAction =>
      authorization(locales).authorization(store)(next)(action);

    return { invoke, next, store };
  };

  test("should handle", (): void => {
    const { invoke, next } = create();
    const action: IAction = { type: "" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
