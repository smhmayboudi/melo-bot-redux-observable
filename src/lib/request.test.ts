import { IStateLiterate } from "../../types/iStateLiterate";

import { request } from "./request";

jest.mock("./request");

describe("request lib", (): void => {
  const literate: IStateLiterate = { query: "HI", result: "های" };

  test("test request", (done: jest.DoneCallback): Promise<any> => {
    expect.assertions(1);

    return request({ path: "" })
      .then((value: any): void => {
        expect(value).toEqual(literate);
        done();
      })
      .catch((_reason: any): void => {
        done();
      });
  });
});
