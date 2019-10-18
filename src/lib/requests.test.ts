import { IStateLiterate } from "../../types/iStateLiterate";

import { requests } from "./requests";

jest.mock("./requests");

describe("requests lib", (): void => {
  const literate: IStateLiterate = { query: "HI", result: "های" };

  test("test requests", (done: jest.DoneCallback): void => {
    expect.assertions(1);

    requests({ path: "" })
      .then((value: any): void => {
        expect(value).toEqual(literate);
        done();
      })
      .catch((_reason: any): void => {
        done();
      });
  });
});
