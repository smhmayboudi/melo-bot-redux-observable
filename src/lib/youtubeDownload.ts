import * as debug from "debug";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";

import { IFmtList } from "../../types/lib/iFmtList";
import { IVideoInfo } from "../../types/lib/iVideoInfo";
import { pathThumb, pathVideo } from "../utils/string";

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
        for (let i: number = 0; i < a.length; i = i + 1) {
          a[i] = f(a[i]);
        }

        return a;
      };

      const parseVideoInfo: (videoInfo: string) => IVideoInfo[] = (
        videoInfo: string
      ): IVideoInfo[] => {
        const rxFmtList: RegExp = /fmt_list=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        const fmtListmap: string = unescape(
          (videoInfo.match(rxFmtList) as RegExpMatchArray)[1]
        );

        const rxFmtListNumG: RegExp = /\d+/g;
        const fmtListNums: RegExpMatchArray = fmtListmap.match(
          rxFmtListNumG
        ) as RegExpMatchArray;
        const fmtList: IFmtList[] = [];
        const add: number = 3;
        for (let index: number = 0; index < fmtListNums.length; index += add) {
          fmtList.push({
            height: parseInt(fmtListNums[index + 1 + 1], 10),
            itag: parseInt(fmtListNums[index], 10),
            width: parseInt(fmtListNums[index + 1], 10)
          });
        }

        const rxUrlMap: RegExp = /url_encoded_fmt_stream_map=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        const urlmap: string = unescape(
          (videoInfo.match(rxUrlMap) as RegExpMatchArray)[1]
        );

        const rxUrlG: RegExp = /url=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/g;

        const rxDur: RegExp = /dur=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        let durs: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        durs = map(durs, unescape);
        durs = map(
          durs,
          (s: string): string => (s.match(rxDur) as RegExpMatchArray)[1]
        );

        const rxItag: RegExp = /itag=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        let itags: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        itags = map(itags, unescape);
        itags = map(
          itags,
          (s: string): string => (s.match(rxItag) as RegExpMatchArray)[1]
        );

        const rxMime: RegExp = /mime=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        let mimes: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        mimes = map(mimes, unescape);
        mimes = map(
          mimes,
          (s: string): string => (s.match(rxMime) as RegExpMatchArray)[1]
        );
        mimes = map(mimes, unescape);

        // TODO: const rxThumbnailUrl: RegExp = /thumbnail_url=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        // TODO: const thumbnailUrl: string = unescape((videoInfo.match(rxThumbnailUrl) as RegExpMatchArray)[1]);

        const rxThumbnailUrl: RegExp = /\=(\{.*\})\&/gm;
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

        const rxUrl: RegExp = /url=([\]\[!"#$%'()*+,.\/:;<=>?@\^_`{|}~-\w]*)/;
        let urls: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        urls = map(
          urls,
          (s: string): string => (s.match(rxUrl) as RegExpMatchArray)[1]
        );
        urls = map(urls, unescape);

        const videoInfos: IVideoInfo[] = [];
        for (let index: number = 0; index < durs.length; index = index + 1) {
          videoInfos.push({
            dur: parseFloat(durs[index]),
            fmtList: fmtList[index],
            id: videoId,
            itag: parseInt(itags[index], 10),
            mime: mimes[index],
            thumbnailUrl,
            title: decodeURIComponent(title).replace(/\+/g, " "),
            url: urls[index]
          });
        }

        return videoInfos;
      };

      const downloadVideo: (videoInfos: IVideoInfo[]) => void = (
        videoInfos: IVideoInfo[]
      ): void => {
        const videoInfo: IVideoInfo = videoInfos
          .filter((value: IVideoInfo): boolean => value.mime === "video/mp4")
          .sort(
            (a: IVideoInfo, b: IVideoInfo) => a.fmtList.width - b.fmtList.width
          )[0];

        const thumbDownload: (vi: IVideoInfo) => Promise<any> = async (
          vi: IVideoInfo
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
                  // tslint:disable-next-line: strict-type-predicates
                  if (err === null && stats.size > 0) {
                    appDebug("thumbnail serve cache", thumbPath);
                    res();
                  } else {
                    appDebug("thumbnail start download", thumbPath);
                    https
                      .request(
                        vi.thumbnailUrl,
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

        const videoDownload: (vi: IVideoInfo) => Promise<any> = async (
          vi: IVideoInfo
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
                  // tslint:disable-next-line: strict-type-predicates
                  if (err === null && stats.size > 0) {
                    appDebug("video serve cache", videoPath);
                    res();
                  } else {
                    appDebug("video start download", videoPath);
                    https
                      .request(
                        vi.url,
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
                const videoInfos: IVideoInfo[] = parseVideoInfo(body);
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
