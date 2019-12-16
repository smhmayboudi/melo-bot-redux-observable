import * as env from "../configs/env";
import * as commandStart from "./commandStart";

describe("commandStart utils", (): void => {
  test("should handle parse", (): void => {
    expect(
      commandStart.parse(
        "/start ChYvcmwgQ2d0R2EwMVFkSGd5VW10Q2F3",
        "iCommandStartOptions"
      )
    ).toEqual({ name: "/start", options: { cmd: "/rl CgtGa01QdHgyUmtCaw" } });
  });

  test("should handle split", (): void => {
    expect(commandStart.split("a b")).toEqual(["a", "b"]);
  });

  test("should handle start", (): void => {
    expect(commandStart.start()).toEqual(`t.me/${env.BOT_NAME}?start=hi`);
  });

  test("should handle startGroup", (): void => {
    expect(commandStart.startGroup()).toEqual(
      `t.me/${env.BOT_NAME}?startgroup=hi`
    );
  });

  test("should handle stringify", (): void => {
    expect(
      commandStart.stringify(
        "start",
        { cmd: "/rl CgtGa01QdHgyUmtCaw" },
        "iCommandStartOptions"
      )
    ).toEqual(`t.me/${env.BOT_NAME}?start=ChYvcmwgQ2d0R2EwMVFkSGd5VW10Q2F3`);
  });
});
