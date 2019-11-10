import { parse, stringify } from "./queryString";

describe("queryString utils", (): void => {
  test("should handle parse", (): void => {
    expect(parse("id=1&pageToken=2")).toEqual({ id: "1", pageToken: "2" });
  });

  test("should handle stringify", (): void => {
    expect(stringify({ id: "1", pageToken: "2" })).toEqual("id=1&pageToken=2");
  });
});
