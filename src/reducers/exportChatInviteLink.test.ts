import { IStateExportChatInviteLinkQuery } from "../../types/iStateExportChatInviteLinkQuery";
import * as action from "../actions/exportChatInviteLink";

import * as reducer from "./exportChatInviteLink";

describe("exportChatInviteLink reducer", (): void => {
  const error: Error = new Error("");
  const query: IStateExportChatInviteLinkQuery = {
    chat_id: 0
  };
  const result: string = "";

  test("should handle initialState", (): void => {
    expect(
      reducer.exportChatInviteLink(undefined, {
        exportChatInviteLink: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test("should handle error", (): void => {
    expect(
      reducer.exportChatInviteLink(
        { ...action.initialState, query },
        action.error({ error })
      )
    ).toEqual({ error, query });
  });

  test("should handle query", (): void => {
    expect(
      reducer.exportChatInviteLink(action.initialState, action.query({ query }))
    ).toEqual({ query });
  });

  test("should handle result", (): void => {
    expect(
      reducer.exportChatInviteLink(
        { ...action.initialState, query },
        action.result({ result })
      )
    ).toEqual({ query, result });
  });
});
