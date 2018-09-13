import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as actions from "../actions";
import { actionGetChatMemberResultStatus } from "./boolean";

describe("boolean utils", (): void => {

  const result: IChatMember = {
    status: "member",
    user: {
      first_name: "",
      id: 0,
      is_bot: false,
    },
  };

  test("should handle actionGetChatMemberResultStatus administrator", (): void => {
    expect(actionGetChatMemberResultStatus(actions.getChatMember.result({
      result: {
        ...result,
        status: "administrator",
      },
    })))
      .toEqual(true);
  });

  test("should handle actionGetChatMemberResultStatus creator", (): void => {
    expect(actionGetChatMemberResultStatus(actions.getChatMember.result({
      result: {
        ...result,
        status: "creator",
      },
    })))
      .toEqual(true);
  });

  test("should handle actionGetChatMemberResultStatus member", (): void => {
    expect(actionGetChatMemberResultStatus(actions.getChatMember.result({
      result: {
        ...result,
        status: "member",
      },
    })))
      .toEqual(true);
  });

  test("should handle actionGetChatMemberResultStatus restricted", (): void => {
    expect(actionGetChatMemberResultStatus(actions.getChatMember.result({
      result: {
        ...result,
        status: "restricted",
      },
    })))
      .toEqual(true);
  });

  test("should handle actionGetChatMemberResultStatus left", (): void => {
    expect(actionGetChatMemberResultStatus(actions.getChatMember.result({
      result: {
        ...result,
        status: "left",
      },
    })))
      .toEqual(false);
  });

  test("should handle actionGetChatMemberResultStatus kicked", (): void => {
    expect(actionGetChatMemberResultStatus(actions.getChatMember.result({
      result: {
        ...result,
        status: "kicked",
      },
    })))
      .toEqual(false);
  });

  test("should handle actionGetChatMemberResultStatus action", (): void => {
    expect(actionGetChatMemberResultStatus())
      .toEqual(false);
  });

  test("should handle actionGetChatMemberResultStatus actionGetChatMemberResult", (): void => {
    expect(actionGetChatMemberResultStatus(actions.getChatMember.result({
      result: undefined,
    })))
      .toEqual(false);
  });

});
