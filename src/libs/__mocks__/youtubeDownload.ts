import { IStateLiterate } from "../../../types/iStateLiterate";

const literate: IStateLiterate = { query: "HI", result: "های" };

const requests: (_videoId: string) => Promise<any> = async (
  _videoId: string
): Promise<any> =>
  new Promise(
    (
      resolve: (value?: any | PromiseLike<any>) => void,
      _reject: (reason?: any) => void
    ): void => {
      process.nextTick(() => resolve(literate));
    }
  );

export { requests };