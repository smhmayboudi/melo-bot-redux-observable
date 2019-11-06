const requests: (_videoId: string) => Promise<any> = (
  _videoId: string
): Promise<any> =>
  new Promise(
    (
      resolve: (value?: any | PromiseLike<any>) => void,
      _reject: (reason?: any) => void
    ): void => {
      process.nextTick(() => resolve(true));
    }
  );

export { requests };
