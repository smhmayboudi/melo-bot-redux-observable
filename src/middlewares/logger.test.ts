import { Action } from "redux";

import { logger } from "./logger";

describe("logger middleware", (): void => {
  const create: () => {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
      replaceReducer: jest.Mock;
      subscribe: jest.Mock;
    };
    invoke(action: Action<string>): Action<string>;
  } = (): {
    next: jest.Mock;
    store: any;
    invoke(action: Action<string>): Action<string>;
  } => {
    const next: jest.Mock = jest.fn();
    const store: any = {
      dispatch: jest.fn(),
      getState: jest.fn(() => {}),
      replaceReducer: jest.fn(() => {}),
      subscribe: jest.fn(() => jest.fn(() => {}))
    };
    const invoke: (action: Action<string>) => Action<string> = (
      action: Action<string>
    ): Action<string> => logger(store)(next)(action);

    return { invoke, next, store };
  };

  test("should handle", (): void => {
    const { invoke, next } = create();
    const action: Action<string> = { type: "" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
