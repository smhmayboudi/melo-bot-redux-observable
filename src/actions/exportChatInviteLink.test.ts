import { IStateExportChatInviteLinkQuery } from "../../types/iStateExportChatInviteLinkQuery";

import * as action from "./exportChatInviteLink";

describe("exportChatInviteLink actions", (): void => {
  const error: Error = new Error("");
  const query: IStateExportChatInviteLinkQuery = {
    chat_id: 0
  };
  const result: string = "";

  test("should handle error", (): void => {
    expect(action.error({ error })).toEqual({
      exportChatInviteLink: { error },
      type: action.EXPORT_CHAT_INVITE_LINK_ERROR
    });
  });

  test("should handle query", (): void => {
    expect(action.query({ query })).toEqual({
      exportChatInviteLink: { query },
      type: action.EXPORT_CHAT_INVITE_LINK_QUERY
    });
  });

  test("should handle result", (): void => {
    expect(action.result({ result })).toEqual({
      exportChatInviteLink: { result },
      type: action.EXPORT_CHAT_INVITE_LINK_RESULT
    });
  });
});
