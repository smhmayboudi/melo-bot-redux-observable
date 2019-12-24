import * as action from "../actions/commandUI";

import * as reducer from "./commandUI";

describe("commandUI reducer", (): void => {
  test("should handle initialState", (): void => {
    expect(
      reducer.commandUI(undefined, {
        commandUI: {},
        type: ""
      })
    ).toEqual(action.initialState);
  });

  test.todo("should handle help");

  test.todo("should handle help");

  test.todo("should handle parse");

  test.todo("should handle setInlineGeo");

  test.todo("should handle settings");

  test.todo("should handle shortenList");

  test.todo("should handle shortenReset");

  test.todo("should handle split");

  test.todo("should handle start");

  test.todo("should handle startGroup");

  test.todo("should handle stringify");

  test.todo("should handle youtubeDownload");

  test.todo("should handle youtubeSearchListByQ");

  test.todo("should handle youtubeSearchListByRelatedToVideoId");

  test.todo("should handle youtubeVideoList");
});
