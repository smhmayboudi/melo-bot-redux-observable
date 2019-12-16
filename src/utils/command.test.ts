import * as command from "./command";

describe("command utils", (): void => {
  test("should handle help", (): void => {
    expect(command.help()).toEqual("/help");
  });

  test("should handle parse", (): void => {
    expect(
      command.parse(
        "/rl CgtGa01QdHgyUmtCaw",
        "iCommandYoutubeSearchListByRelatedToVideoIdOptions"
      )
    ).toEqual({ name: "/rl", options: { id: "FkMPtx2RkBk" } });
  });

  test("should handle setInlineGeo", (): void => {
    expect(command.setInlineGeo()).toEqual("/setinlinegeo");
  });

  test("should handle settings", (): void => {
    expect(command.settings()).toEqual("/settings");
  });

  test("should handle shortenList", (): void => {
    expect(command.shortenList()).toEqual("/sl");
  });

  test("should handle shortenReset", (): void => {
    expect(command.shortenReset()).toEqual("/sr");
  });

  test("should handle split", (): void => {
    expect(command.split("a b")).toEqual(["a", "b"]);
  });

  test("should handle start", (): void => {
    expect(command.start()).toEqual("/start");
  });

  test("should handle startGroup", (): void => {
    expect(command.startGroup()).toEqual("/startgroup");
  });

  test("should handle stringify", (): void => {
    expect(
      command.stringify(
        "rl",
        { id: "FkMPtx2RkBk" },
        "iCommandYoutubeSearchListByRelatedToVideoIdOptions"
      )
    ).toEqual("/rl CgtGa01QdHgyUmtCaw");
  });

  test("should handle youtubeDownload", (): void => {
    expect(command.youtubeDownload()).toEqual("/dl");
  });

  test("should handle youtubeSearchList", (): void => {
    expect(command.youtubeSearchListByQ()).toEqual("/ysl");
  });

  test("should handle youtubeSearchListByRelatedToVideoId", (): void => {
    expect(command.youtubeSearchListByRelatedToVideoId()).toEqual("/rl");
  });

  test("should handle youtubeVideoList", (): void => {
    expect(command.youtubeVideoList()).toEqual("/mp");
  });
});
