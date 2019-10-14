import * as FormData from "form-data";

import { IStateLiterate } from "../../types/iStateLiterate";

import { requestUpload } from "./requestUpload";

jest.mock("./requestUpload");

describe("requestUpload lib", (): void => {
  const literate: IStateLiterate = { query: "HI", result: "های" };

  test("test requestUpload", (done: jest.DoneCallback): void => {
    expect.assertions(1);

    requestUpload(
      {
        path: "/litrate/HI"
      },
      new FormData()
    )
      .then((value: any): void => {
        expect(value).toEqual(literate);
        done();
      })
      .catch((reason: any): void => {
        done();
      });
  });
});
