import debug from "debug";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";

import { pathThumb, pathVideo } from "../utils/string";
import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";

const appDebug: debug.IDebugger = debug("app:lib:youtubeDownload");

const youtubeDownload: (videoId: string) => Promise<any> = async (
  videoId: string
): Promise<any> =>
  new Promise(
    (
      resolve: (value?: any | PromiseLike<any>) => void,
      reject: (reason?: any) => void
    ): void => {
      const map: (
        a: RegExpMatchArray,
        f: (str: string) => string
      ) => RegExpMatchArray = (
        a: RegExpMatchArray,
        f: (str: string) => string
      ): RegExpMatchArray => {
        for (let i = 0; i < a.length; i = i + 1) {
          a[i] = f(a[i]);
        }

        return a;
      };

      const parseVideoInfo: (
        videoInfo: string
      ) => IStateYoutubeDownloadResultInsertQuery[] = (
        videoInfo: string
      ): IStateYoutubeDownloadResultInsertQuery[] => {
        const rxFmtList = /fmt_list=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        const fmtListmap: string = unescape(
          (videoInfo.match(rxFmtList) as RegExpMatchArray)[1]
        );

        const rxFmtListNumG = /\d+/g;
        const fmtListNums: RegExpMatchArray = fmtListmap.match(
          rxFmtListNumG
        ) as RegExpMatchArray;
        const fmtList: {
          height: number;
          itag: number;
          width: number;
        }[] = [];
        const add = 3;
        for (let index = 0; index < fmtListNums.length; index += add) {
          fmtList.push({
            height: parseInt(fmtListNums[index + 1 + 1], 10),
            itag: parseInt(fmtListNums[index], 10),
            width: parseInt(fmtListNums[index + 1], 10)
          });
        }

        const rxUrlMap = /url_encoded_fmt_stream_map=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        const urlmap: string = unescape(
          (videoInfo.match(rxUrlMap) as RegExpMatchArray)[1]
        );

        const rxUrlG = /url=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/g;

        const rxDur = /dur=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        let durs: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        durs = map(durs, unescape);
        durs = map(
          durs,
          (s: string): string => (s.match(rxDur) as RegExpMatchArray)[1]
        );

        const rxItag = /itag=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        let itags: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        itags = map(itags, unescape);
        itags = map(
          itags,
          (s: string): string => (s.match(rxItag) as RegExpMatchArray)[1]
        );

        const rxMime = /mime=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        let mimes: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        mimes = map(mimes, unescape);
        mimes = map(
          mimes,
          (s: string): string => (s.match(rxMime) as RegExpMatchArray)[1]
        );
        mimes = map(mimes, unescape);

        // TODO: const rxThumbnailUrl: RegExp = /thumbnail_url=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        // TODO: const thumbnailUrl: string = unescape((videoInfo.match(rxThumbnailUrl) as RegExpMatchArray)[1]);

        const rxThumbnailUrl = /\=(\{.*\})\&/gm;
        const res: RegExpMatchArray | null = rxThumbnailUrl.exec(
          unescape(videoInfo)
        );
        const playerResponse: string = res !== null ? res[1] : "";
        const playerResponseJSON: any = JSON.parse(playerResponse);
        const thumbnailUrl: string =
          playerResponseJSON.videoDetails.thumbnail.thumbnails[0].url;

        // TODO: const rxTitle: RegExp = /title=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        // TODO: const title: string = (videoInfo.match(rxTitle) as RegExpMatchArray)[1];

        const title: string = playerResponseJSON.videoDetails.title;

        const rxUrl = /url=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        let urls: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        urls = map(
          urls,
          (s: string): string => (s.match(rxUrl) as RegExpMatchArray)[1]
        );
        urls = map(urls, unescape);

        const videoInfos: IStateYoutubeDownloadResultInsertQuery[] = [];
        for (let index = 0; index < durs.length; index = index + 1) {
          videoInfos.push({
            duration: parseFloat(durs[index]),
            file_id: urls[index],
            file_size: 0,
            height: fmtList[index].height,
            id: videoId,
            mime_type: mimes[index],
            thumb: {
              file_id: thumbnailUrl,
              file_size: 0,
              // TODO: check it
              height: 0,
              // TODO: check it
              width: 0
            },
            title: decodeURIComponent(title).replace(/\+/g, " "),
            width: fmtList[index].width
          });
        }

        return videoInfos;
      };

      const downloadVideo: (
        videoInfos: IStateYoutubeDownloadResultInsertQuery[]
      ) => void = (
        videoInfos: IStateYoutubeDownloadResultInsertQuery[]
      ): void => {
        const videoInfo: IStateYoutubeDownloadResultInsertQuery = videoInfos
          .filter(
            (value: IStateYoutubeDownloadResultInsertQuery): boolean =>
              value.mime_type === "video/mp4"
          )
          .sort(
            (
              a: IStateYoutubeDownloadResultInsertQuery,
              b: IStateYoutubeDownloadResultInsertQuery
            ) => a.width - b.width
          )[0];

        const thumbDownload: (
          vi: IStateYoutubeDownloadResultInsertQuery
        ) => Promise<any> = async (
          vi: IStateYoutubeDownloadResultInsertQuery
        ): Promise<any> =>
          new Promise(
            (
              res: (value?: any | PromiseLike<any>) => void,
              rej: (reason?: any) => void
            ): void => {
              const thumbPath: string = pathThumb(vi.id);
              fs.stat(
                thumbPath,
                (err: NodeJS.ErrnoException, stats: fs.Stats): void => {
                  if (err === null && stats.size > 0) {
                    appDebug("thumbnail serve cache", thumbPath);
                    res();
                  } else {
                    appDebug("thumbnail start download", thumbPath);
                    // TODO: check it
                    if (vi.thumb === undefined) {
                      return;
                    }
                    https
                      .request(
                        vi.thumb.file_id,
                        (response: http.IncomingMessage): void => {
                          appDebug(
                            "thumbnail response.statusCode",
                            response.statusCode
                          );
                          const stream: fs.WriteStream = fs.createWriteStream(
                            thumbPath
                          );
                          response
                            .on("end", (): void => {
                              appDebug("thumbnail finish download", thumbPath);
                              res();
                            })
                            .pipe(stream);
                        }
                      )
                      .on("error", (error: Error): void => {
                        appDebug("thumbnail error", error);
                        rej(error);
                      })
                      .end((): void => {
                        appDebug("thumbnail end");
                      });
                  }
                }
              );
            }
          );

        const videoDownload: (
          vi: IStateYoutubeDownloadResultInsertQuery
        ) => Promise<any> = async (
          vi: IStateYoutubeDownloadResultInsertQuery
        ): Promise<any> =>
          new Promise(
            (
              res: (value?: any | PromiseLike<any>) => void,
              rej: (reason?: any) => void
            ): void => {
              const videoPath: string = pathVideo(vi.id);
              fs.stat(
                videoPath,
                (err: NodeJS.ErrnoException, stats: fs.Stats): void => {
                  if (err === null && stats.size > 0) {
                    appDebug("video serve cache", videoPath);
                    res();
                  } else {
                    appDebug("video start download", videoPath);
                    https
                      .request(
                        vi.file_id,
                        (response: http.IncomingMessage): void => {
                          appDebug(
                            "video response.statusCode",
                            response.statusCode
                          );
                          const stream: fs.WriteStream = fs.createWriteStream(
                            videoPath
                          );
                          response
                            .on("end", (): void => {
                              appDebug("video finish download", videoPath);
                              res();
                            })
                            .pipe(stream);
                        }
                      )
                      .on("error", (error: Error): void => {
                        appDebug("video error", error);
                        rej(error);
                      })
                      .end((): void => {
                        appDebug("video end");
                      });
                  }
                }
              );
            }
          );

        Promise.all([thumbDownload(videoInfo), videoDownload(videoInfo)])
          .then(() => {
            resolve(videoInfo);
          })
          .catch((reason: any) => {
            reject(reason);
          });
      };

      https
        .request(
          `https://www.youtube.com/get_video_info?video_id=${videoId}`,
          (response: http.IncomingMessage): void => {
            appDebug("response.statusCode", response.statusCode);
            const chunks: any[] = [];
            response
              .on("data", (chunk: any): void => {
                appDebug("data", chunk);
                chunks.push(chunk);
              })
              .on("end", (): void => {
                const body: string = Buffer.concat(chunks).toString();
                appDebug("body", body);
                const videoInfos: IStateYoutubeDownloadResultInsertQuery[] = parseVideoInfo(
                  body
                );
                downloadVideo(videoInfos);
              });
          }
        )
        .on("error", (error: Error): void => {
          appDebug("error", error);
          reject(error);
        })
        .end((): void => {
          appDebug("end");
        });
    }
  );

export { youtubeDownload };
