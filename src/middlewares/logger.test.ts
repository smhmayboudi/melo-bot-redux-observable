import { Action } from "redux";
import * as middleware from "./logger";

describe("logger middleware", (): void => {

  const create: () => {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    };
    invoke(action: Action<string>): Action<string>;
  } = (): {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    };
    invoke(action: Action<string>): Action<string>;
  } => {
      const store: {
        dispatch: jest.Mock;
        getState: jest.Mock;
      } = {
        dispatch: jest.fn(),
        getState: jest.fn(() => ({})),
      };
      const next: jest.Mock = jest.fn();
      const invoke:
        (action: Action<string>) => Action<string> =
        (action: Action<string>): Action<string> =>
          middleware.logger(store)(next)(action);

      return { invoke, next, store };
    };

  test("should handle", (): void => {
    const { invoke, next } = create();
    const action: Action<string> = { type: "" };
    invoke(action);
    expect(next)
      .toHaveBeenCalledWith(action);
  });

});
