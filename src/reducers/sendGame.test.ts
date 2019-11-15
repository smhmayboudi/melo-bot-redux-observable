import { IStateSendGameQuery } from "../../types/iStateSendGameQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendGame";

import * as reducer from "./sendGame";

describe("sendGame reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateSendGameQuery = {
    chat_id: 0,
    game_short_name: ""
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
      reducer.sendGame(undefined, {
        sendGame: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.sendGame(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.sendGame(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.sendGame(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
