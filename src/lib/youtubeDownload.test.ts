import { IStateLiterate } from "../../types/iStateLiterate";

import { youtubeDownload } from "./youtubeDownload";

jest.mock("./youtubeDownload");

describe("youtubeDownload lib", (): void => {
  const literate: IStateLiterate = { query: "HI", result: "های" };

  test("test youtubeDownload", (done: jest.DoneCallback): void => {
    expect.assertions(1);

    youtubeDownload("")
      .then((value: any): void => {
        expect(value).toEqual(literate);
        done();
      })
      .catch((_reason: any): void => {
        done();
      });
  });
});
