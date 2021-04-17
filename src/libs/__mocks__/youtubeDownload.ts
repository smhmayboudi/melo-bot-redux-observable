const requests: <T>(_videoId: string) => Promise<boolean> = <T>(
  _videoId: string
): Promise<boolean> =>
  new Promise(
    (
      resolve: (value?: boolean | PromiseLike<boolean>) => void,
      _reject: (reason?: any) => void
    ): void => {
      process.nextTick(() => resolve(true));
    }
  );

export { requests };
