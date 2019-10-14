import { IStateLiterate } from "../../types/iStateLiterate";

import { request } from "./request";

jest.mock("./request");

describe("request lib", (): void => {
  const literate: IStateLiterate = { query: "HI", result: "های" };

  test("test request", (done: jest.DoneCallback): void => {
    expect.assertions(1);

    request({
      path: "/litrate/HI"
    })
      .then((value: any): void => {
        expect(value).toEqual(literate);
        done();
      })
      .catch((reason: any): void => {
        done();
      });
  });
});
