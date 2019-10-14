import { Action } from "redux";

import * as middleware from "./crashReporter";

describe("crashReporter middleware", (): void => {
  const create: (
    error?: () => void
  ) => {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
    };
    invoke(action: Action<string>): Action<string>;
  } = (
    error?: () => void
  ): {
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
      getState: jest.fn(() => ({}))
    };
    const next: jest.Mock = jest.fn(error);
    const invoke: (action: Action<string>) => Action<string> = (
      action: Action<string>
    ): Action<string> => middleware.crashReporter(store)(next)(action);

    return { invoke, next, store };
  };

  test("should handle", (): void => {
    const { invoke, next } = create();
    const action: Action<string> = { type: "" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test("should handle exception", (): void => {
    const error: Error = new Error("");
    const { next, invoke } = create((): void => {
      throw error;
    });
    const action: Action<string> = { type: "" };
    try {
      invoke(action);
    } catch {
      expect(next).toThrow(error);
    }
  });
});
