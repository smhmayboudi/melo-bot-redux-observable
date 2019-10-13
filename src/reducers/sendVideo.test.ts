import { IStateSendVideoQuery } from "../../types/iStateSendVideoQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendVideo";
import * as reducer from "./sendVideo";

describe("sendVideo reducer", (): void => {

  const error: Error = new Error("");
  const query: IStateSendVideoQuery = {
    chat_id: 0,
    video: "",
  };
  const result: IMessage = {
    chat: {
      id: 0,
      type: "private",
    },
    date: 0,
    message_id: 0,
  };

  test("should handle initialState", (): void => {
    expect(reducer.sendVideo(undefined, { sendVideo: {}, type: "" }))
      .toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(reducer.sendVideo({ ...action.initialState, query }, action.error({ error })))
      .toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(reducer.sendVideo(action.initialState, action.query({ query })))
      .toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(reducer.sendVideo({ ...action.initialState, query }, action.result({ result })))
      .toEqual({ query, result });
  });

});
