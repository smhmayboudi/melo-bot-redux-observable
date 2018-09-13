import { IStateMessageQuery } from "../../types/iStateMessageQuery";
import * as action from "./message";

describe("message actions", (): void => {

  const query: IStateMessageQuery = {
    update_id: 0,
  };

  test("should hanle query", (): void => {
    expect(action.query({ query }))
      .toEqual({
        message: { query },
        type: action.MESSAGE_QUERY,
      });
  });

});
