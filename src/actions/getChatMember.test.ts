import { IStateGetChatMemberQuery } from "../../types/iStateGetChatMemberQuery";
import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as action from "./getChatMember";

describe("getChatMember actions", (): void => {

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

  test("should handle error", (): void => {
    expect(action.error({ error }))
      .toEqual({
        getChatMember: { error },
        type: action.GET_CHAT_MEMBER_ERROR,
      });
  });

  test("should handle query", (): void => {
    expect(action.query({ query }))
      .toEqual({
        getChatMember: { query },
        type: action.GET_CHAT_MEMBER_QUERY,
      });
  });

  test("should handle result", (): void => {
    expect(action.result({ result }))
      .toEqual({
        getChatMember: { result },
        type: action.GET_CHAT_MEMBER_RESULT,
      });
  });

});
