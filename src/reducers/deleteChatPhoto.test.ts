import { IStateDeleteChatPhotoQuery } from "../../types/iStateDeleteChatPhotoQuery";
import * as action from "../actions/deleteChatPhoto";

import * as reducer from "./deleteChatPhoto";

describe("deleteChatPhoto reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateDeleteChatPhotoQuery = {
    chat_id: 0
  };
  const result: boolean = true;

  test("should handle initialState", (): void => {
    expect(
      reducer.deleteChatPhoto(undefined, {
        deleteChatPhoto: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.deleteChatPhoto(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.deleteChatPhoto(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.deleteChatPhoto(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
