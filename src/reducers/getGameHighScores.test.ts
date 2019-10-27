import { IStateGetGameHighScoresQuery } from "../../types/iStateGetGameHighScoresQuery";
import { IGameHighScore } from "../../types/telegramBot/games/iGameHighScore";
import * as action from "../actions/getGameHighScores";

import * as reducer from "./getGameHighScores";

describe("getGameHighScores reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateGetGameHighScoresQuery = {
    user_id: 0
  };
  const result: IGameHighScore[] = [
    {
      position: 0,
      score: 0,
      user: {
        first_name: "",
        id: 0,
        is_bot: false
      }
    }
  ];

  test("should handle initialState", (): void => {
    expect(
      reducer.getGameHighScores(undefined, {
        getGameHighScores: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.getGameHighScores(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.getGameHighScores(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.getGameHighScores(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
