import * as FormData from "form-data";

import { IStateLiterate } from "../../types/iStateLiterate";

import { requestsUpload } from "./requestsUpload";

jest.mock("./requestsUpload");

describe("requestsUpload lib", (): void => {
  const literate: IStateLiterate = { query: "HI", result: "های" };

  test("test requestsUpload", (done: jest.DoneCallback): void => {
    expect.assertions(1);

    requestsUpload(
      {
        path: "/litrate/HI"
      },
      new FormData()
    )
      .then((value: any): void => {
        expect(value).toEqual(literate);
        done();
      })
      .catch((_reason: any): void => {
        done();
      });
  });
});
