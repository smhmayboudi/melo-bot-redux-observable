import { findByCode } from "./emojis";
import * as texts from "./texts";

describe("texts configs", (): void => {
  test("should handle messageResultChart", (): void => {
    expect(texts.messageResultChart("")).toEqual(
      `${findByCode("1F50E").char} RESULT(S) RELATED TO `
    );
  });

  test("should handle messageResultQ", (): void => {
    expect(texts.messageResultQ("")).toEqual(
      `${findByCode("1F50E").char} QUERY RESULT(S) OF `
    );
  });

  test("should handle messageResultRelatedToVideoId", (): void => {
    expect(texts.messageResultRelatedToVideoId("")).toEqual(
      `${findByCode("1F50E").char} RESULT(S) RELATED TO `
    );
  });
});
