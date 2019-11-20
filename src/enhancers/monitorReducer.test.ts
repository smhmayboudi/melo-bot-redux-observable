import { monitorReducer } from "./monitorReducer";

describe("monitorReducer middleware", (): void => {
  const create: () => {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
      replaceReducer: jest.Mock;
      subscribe: jest.Mock;
    };
  } = (): {
    next: jest.Mock;
    store: {
      dispatch: jest.Mock;
      getState: jest.Mock;
      replaceReducer: jest.Mock;
      subscribe: jest.Mock;
    };
  } => {
    const next: jest.Mock = jest.fn();
    const store: any = {
      dispatch: jest.fn(),
      getState: jest.fn(() => {}),
      replaceReducer: jest.fn(() => {}),
      subscribe: jest.fn(() => jest.fn(() => {}))
    };

    return { next, store };
  };

  test("should handle", (): void => {
    const { next } = create();
    monitorReducer(next);
    expect(next).toHaveBeenCalled();
  });
});
