import * as command from "./command";

describe("command utils", (): void => {
  test("should handle addStickerToSet", (): void => {
    expect(command.addStickerToSet()).toEqual("/addStickerToSet");
  });

  test("should handle createNewStickerSet", (): void => {
    expect(command.createNewStickerSet()).toEqual("/createNewStickerSet");
  });

  test("should handle download", (): void => {
    expect(command.download()).toEqual("/dl");
  });

  test("should handle getChatMember", (): void => {
    expect(command.getChatMember()).toEqual("/getChatMember");
  });

  test("should handle help", (): void => {
    expect(command.help()).toEqual("/help");
  });

  test("should handle mostPopular", (): void => {
    expect(command.mostPopular()).toEqual("/mp");
  });

  test("should handle parse", (): void => {
    expect(
      command.parse("/rl CgtGa01QdHgyUmtCaw", "iCommandRelatedToVideoIdOptions")
    ).toEqual({ name: "/rl", options: { id: "FkMPtx2RkBk" } });
  });

  test("should handle relatedToVideoId", (): void => {
    expect(command.relatedToVideoId()).toEqual("/rl");
  });

  test("should handle sendAnimation", (): void => {
    expect(command.sendAnimation()).toEqual("/sendAnimation");
  });

  test("should handle sendAudio", (): void => {
    expect(command.sendAudio()).toEqual("/sendAudio");
  });

  test("should handle sendDocument", (): void => {
    expect(command.sendDocument()).toEqual("/sendDocument");
  });

  test("should handle sendMediaGroup", (): void => {
    expect(command.sendMediaGroup()).toEqual("/sendMediaGroup");
  });

  test("should handle sendMessage", (): void => {
    expect(command.sendMessage()).toEqual("/sendMessage");
  });

  test("should handle sendPhoto", (): void => {
    expect(command.sendPhoto()).toEqual("/sendPhoto");
  });

  test("should handle sendSticker", (): void => {
    expect(command.sendSticker()).toEqual("/sendSticker");
  });

  test("should handle sendVideo", (): void => {
    expect(command.sendVideo()).toEqual("/sendVideo");
  });

  test("should handle sendVideoNote", (): void => {
    expect(command.sendVideoNote()).toEqual("/sendVideoNote");
  });

  test("should handle sendVoice", (): void => {
    expect(command.sendVoice()).toEqual("/sendVoice");
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

  test("should handle start", (): void => {
    expect(command.start()).toEqual("/start");
  });

  test("should handle startGroup", (): void => {
    expect(command.startGroup()).toEqual("/startGroup");
  });

  test("should handle stringify", (): void => {
    expect(
      command.stringify(
        "rl",
        { id: "FkMPtx2RkBk" },
        "iCommandRelatedToVideoIdOptions"
      )
    ).toEqual("/rl CgtGa01QdHgyUmtCaw");
  });

  test("should handle youtubeDownload", (): void => {
    expect(command.youtubeDownload()).toEqual("/youtubeDownload");
  });

  test("should handle youtubeSearchList", (): void => {
    expect(command.youtubeSearchList()).toEqual("/youtubeSearchList");
  });

  test("should handle youtubeVideoList", (): void => {
    expect(command.youtubeVideoList()).toEqual("/youtubeVideoList");
  });
});
