import { IChatMember } from "../../types/telegramBot/types/iChatMember";
import * as actions from "../actions";

import { actionGetChatMemberResultStatus } from "./boolean";

describe("boolean utils", (): void => {
  const result: IChatMember = {
    status: "member",
    user: {
      first_name: "",
      id: 0,
      is_bot: false
    }
  };

  test("should handle actionGetChatMemberResultStatus administrator", (): void => {
    expect(
      actionGetChatMemberResultStatus(
        actions.getChatMember.result({
          result: {
            ...result,
            status: "administrator"
          }
        })
      )
    ).toEqual(true);
  });

  //   Test("should handle actionGetChatMemberResultStatus creator", (): void => {
  //     Expect(
  //       ActionGetChatMemberResultStatus(
  //         Actions.getChatMember.result({
  //           Result: {
  //             ...result,
  //             Status: "creator"
  //           }
  //         })
  //       )
  //     ).toEqual(true);
  //   });

  //   Test("should handle actionGetChatMemberResultStatus member", (): void => {
  //     Expect(
  //       ActionGetChatMemberResultStatus(
  //         Actions.getChatMember.result({
  //           Result: {
  //             ...result,
  //             Status: "member"
  //           }
  //         })
  //       )
  //     ).toEqual(true);
  //   });

  //   Test("should handle actionGetChatMemberResultStatus restricted", (): void => {
  //     Expect(
  //       ActionGetChatMemberResultStatus(
  //         Actions.getChatMember.result({
  //           Result: {
  //             ...result,
  //             Status: "restricted"
  //           }
  //         })
  //       )
  //     ).toEqual(true);
  //   });

  //   Test("should handle actionGetChatMemberResultStatus left", (): void => {
  //     Expect(
  //       ActionGetChatMemberResultStatus(
  //         Actions.getChatMember.result({
  //           Result: {
  //             ...result,
  //             Status: "left"
  //           }
  //         })
  //       )
  //     ).toEqual(false);
  //   });

  //   Test("should handle actionGetChatMemberResultStatus kicked", (): void => {
  //     Expect(
  //       ActionGetChatMemberResultStatus(
  //         Actions.getChatMember.result({
  //           Result: {
  //             ...result,
  //             Status: "kicked"
  //           }
  //         })
  //       )
  //     ).toEqual(false);
  //   });

  test("should handle actionGetChatMemberResultStatus action", (): void => {
    expect(actionGetChatMemberResultStatus()).toEqual(false);
  });

  //   Test("should handle actionGetChatMemberResultStatus actionGetChatMemberResult", (): void => {
  //     Expect(
  //       ActionGetChatMemberResultStatus(
  //         Actions.getChatMember.result({
  //           Result: undefined
  //         })
  //       )
  //     ).toEqual(false);
  //   });
});
