import { IStateSetGameScoreQuery } from "../../types/iStateSetGameScoreQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/setGameScore";

import * as reducer from "./setGameScore";

describe("setGameScore reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSetGameScoreQuery = {
    score: 0,
    user_id: 0
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: ""
    },
    date: 0,
    message_id: 0
  };

  test("should handle initialState", (): void => {
    expect(
      reducer.setGameScore(undefined, {
        setGameScore: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.setGameScore(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.setGameScore(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.setGameScore(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
