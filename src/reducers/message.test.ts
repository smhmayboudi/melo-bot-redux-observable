import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import * as action from "../actions/message";

import * as reducer from "./message";

describe("message reducer", (): void => {
  const query: IStateMessageQuery = {
    update_id: 0
  };

  test("should handle initialState", (): void => {
    expect(reducer.message(undefined, { message: {}, type: "" })).toEqual(
      action.initialState
    );
  });

  test("should handle query", (): void => {
    expect(
      reducer.message(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });
});
