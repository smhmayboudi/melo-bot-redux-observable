import { IStateSetGameScoreQuery } from "../../types/iStateSetGameScoreQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";

import * as action from "./setGameScore";

describe("setGameScore actions", (): void => {
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

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      setGameScore: { error },
      type: action.SET_GAME_SCORE_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      setGameScore: { query },
      type: action.SET_GAME_SCORE_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      setGameScore: { result },
      type: action.SET_GAME_SCORE_RESULT
    });
  });
});
