import { IStateGetChatMemberQuery } from "../../types/iStateGetChatMemberQuery";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as action from "../actions/getChatMember";
import * as reducer from "./getChatMember";

describe("getChatMember reducer", (): void => {

  const error: Error = new Error("");
  const query: IStateGetChatMemberQuery = {
    chat_id: 0,
    user_id: 0,
  };
  const result: IChatMember = {
    status: "member",
    user: {
      first_name: "",
      id: 0,
      is_bot: false,
    },
  };

  test("should handle initialState", (): void => {
    expect(reducer.getChatMember(undefined, { getChatMember: {}, type: "" }))
      .toEqual(action.initalState);
  });

  test("should handle error", (): void => {
    expect(reducer.getChatMember({ ...action.initalState, query }, action.error({ error })))
      .toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(reducer.getChatMember(action.initalState, action.query({ query })))
      .toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(reducer.getChatMember({ ...action.initalState, query }, action.result({ result })))
      .toEqual({ query, result });
  });

});
