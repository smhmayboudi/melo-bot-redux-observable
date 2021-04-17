import { IStateGetGameHighScoresQuery } from "../../types/iStateGetGameHighScoresQuery";
import { IGameHighScore } from "../../types/telegramBot/games/iGameHighScore";

import * as action from "./getGameHighScores";

describe("getGameHighScores actions", (): void => {
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

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      getGameHighScores: { error },
      type: action.GET_GAME_HIGH_SCORES_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      getGameHighScores: { query },
      type: action.GET_GAME_HIGH_SCORES_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      getGameHighScores: { result },
      type: action.GET_GAME_HIGH_SCORES_RESULT
    });
  });
});
