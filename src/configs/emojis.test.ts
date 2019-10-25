import { findByCode, findByName } from "./emojis";

describe("emoji configs", (): void => {
  test("should handle findByCode", (): void => {
    expect(findByCode("1F447").codes).toEqual("1F447");
  });

  test("should handle not findByCode", (): void => {
    expect(findByCode("1F4471").codes).toEqual("1F534");
  });

  test("should handle findByName", (): void => {
    expect(findByCode("1F447").codes).toEqual("1F447");
  });

  test("should handle not findByName", (): void => {
    expect(findByName("backhand down").codes).toEqual("1F534");
  });
});
