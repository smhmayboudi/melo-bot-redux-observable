import { findByCode } from "./emojis";
import * as texts from "./texts";

describe("texts configs", (): void => {
  test("should handle messageResultQ", (): void => {
    expect(texts.messageResultQ("")).toEqual(
      `${findByCode("1F50E").char} QUERY RESULT(S) OF `
    );
  });

  test("should handle messageResultRelatedTo", (): void => {
    expect(texts.messageResultRelatedTo("")).toEqual(
      `${findByCode("1F50E").char} RESULT(S) RELATED TO `
    );
  });
});
