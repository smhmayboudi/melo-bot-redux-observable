import { IStateSendAudioQuery } from "../../types/iStateSendAudioQuery";
import { IMessage } from "../../types/telegramBot/types/iMessage";
import * as action from "../actions/sendAudio";
import * as reducer from "./sendAudio";

describe("sendAudio reducer", (): void => {

  const error: Error = new Error("");
  const query: IStateSendAudioQuery = {
    audio: "",
    chat_id: 0,
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
    expect(reducer.sendAudio(undefined, { sendAudio: {}, type: "" }))
      .toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(reducer.sendAudio({ ...action.initialState, query }, action.error({ error })))
      .toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(reducer.sendAudio(action.initialState, action.query({ query })))
      .toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(reducer.sendAudio({ ...action.initialState, query }, action.result({ result })))
      .toEqual({ query, result });
  });

});
