import * as path from "path";

import { pathThumb, pathVideo } from "./youtubeDownload";

describe("youtubeDownload configs", (): void => {
  test("should handle pathThumb", (): void => {
    expect(pathThumb("E0yxlqfXfEY")).toEqual(
      path.resolve(__dirname, "../../asset", `${"E0yxlqfXfEY"}.jpg`)
    );
  });

  test("should handle pathVideo", (): void => {
    expect(pathVideo("E0yxlqfXfEY")).toEqual(
      path.resolve(__dirname, "../../asset", `${"E0yxlqfXfEY"}.mp4`)
    );
  });

  // test("should handle youtubeDownload", (): void => {});
});
