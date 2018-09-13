import { IStateLiterate } from "../../../types/iStateLiterate";

const literate: IStateLiterate = { query: "HI", result: "های" };

const requests:
  (videoId: string) => Promise<any> =
  // @ts-ignore
  async (videoId: string): Promise<any> =>
    // @ts-ignore
    new Promise((resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void): void => {
      resolve(literate);
    });

export { requests };
