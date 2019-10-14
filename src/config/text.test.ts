import * as icons from "./icons";
import * as texts from "./texts";

describe("store config", (): void => {
  test("should handle messageResultQ", (): void => {
    expect(texts.messageResultQ("")).toEqual(
      `${icons.rightPointingMagnifyingGlass} RESULT(S) FOR  QUERY`
    );
  });
});
