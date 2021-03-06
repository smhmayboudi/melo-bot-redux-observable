import debug from "debug";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import * as path from "path";

import { IStateYoutubeDownloadResultInsertQuery } from "../../types/iStateYoutubeDownloadResultInsertQuery";

const appDebug: debug.IDebugger = debug("app:lib:youtubeDownload");

const youtubeDownload: (
  videoId: string
) => Promise<IStateYoutubeDownloadResultInsertQuery> = (
  videoId: string
): Promise<IStateYoutubeDownloadResultInsertQuery> =>
  new Promise(
    (
      resolve: (
        value?:
          | IStateYoutubeDownloadResultInsertQuery
          | PromiseLike<IStateYoutubeDownloadResultInsertQuery>
      ) => void,
      reject: (reason?: Error) => void
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
        const rxFmtList = /fmt_list=([\][!"#$%'()*+,./:;<=>?@^_`{|}~-\w]*)/;
        const fmtListmap: string = unescape(
          (rxFmtList.exec(videoInfo) as RegExpMatchArray)[1]
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

        const rxUrlMap = /url_encoded_fmt_stream_map=([\][!"#$%'()*+,./:;<=>?@^_`{|}~-\w]*)/;
        const urlmap: string = unescape(
          (rxUrlMap.exec(videoInfo) as RegExpMatchArray)[1]
        );

        const rxUrlG = /url=([\][!"#$%'()*+,./:;<=>?@^_`{|}~-\w]*)/g;

        const rxDur = /dur=([\][!"#$%'()*+,./:;<=>?@^_`{|}~-\w]*)/;
        let durs: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        durs = map(durs, unescape);
        durs = map(
          durs,
          (s: string): string => (rxDur.exec(s) as RegExpMatchArray)[1]
        );

        // TODO: const rxItag = /itag=([\][!"#$%'()*+,./:;<=>?@^_`{|}~-\w]*)/;
        // TODO: let itags: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        // TODO: itags = map(itags, unescape);
        // TODO: itags = map(
        // TODO:   itags,
        // TODO:   (s: string): string => (rxItag.exec(s) as RegExpMatchArray)[1]
        // TODO: );

        const rxMime = /mime=([\][!"#$%'()*+,./:;<=>?@^_`{|}~-\w]*)/;
        let mimes: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        mimes = map(mimes, unescape);
        mimes = map(
          mimes,
          (s: string): string => (rxMime.exec(s) as RegExpMatchArray)[1]
        );
        mimes = map(mimes, unescape);

        // TODO: const rxThumbnailUrl: RegExp = /thumbnail_url=([\][!"#$%'()*+,./:;<=>?@^_`{|}~-\w]*)/;
        // TODO: const thumbnailUrl: string = unescape((videoInfo.match(rxThumbnailUrl) as RegExpMatchArray)[1]);

        const rxThumbnailUrl = /=(\{.*\})&/gm;
        const res: RegExpMatchArray | null = rxThumbnailUrl.exec(
          unescape(videoInfo)
        );
        const playerResponse: string = res !== null ? res[1] : "";
        const playerResponseJSON: any = JSON.parse(playerResponse);
        const thumbnailUrl: string =
          playerResponseJSON.videoDetails.thumbnail.thumbnails[0].url;

        // TODO: const rxTitle: RegExp = /title=([\][!"#$%'()*+,./:;<=>?@^_`{|}~-\w]*)/;
        // TODO: const title: string = (videoInfo.match(rxTitle) as RegExpMatchArray)[1];

        const title: string = playerResponseJSON.videoDetails.title;

        const rxUrl = /url=([\][!"#$%'()*+,./:;<=>?@^_`{|}~-\w]*)/;
        let urls: RegExpMatchArray = urlmap.match(rxUrlG) as RegExpMatchArray;
        urls = map(
          urls,
          (s: string): string => (rxUrl.exec(s) as RegExpMatchArray)[1]
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
        const videoInfo: IStateYoutubeDownloadResultInsertQuery | null = videoInfos
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
        ) => Promise<null> = (
          vi: IStateYoutubeDownloadResultInsertQuery
        ): Promise<null> =>
          new Promise(
            (
              res: (value?: null | PromiseLike<null>) => void,
              rej: (reason?: Error) => void
            ): void => {
              const thumbPath: string = path.resolve(
                __dirname,
                "../../asset",
                `${vi.id}.jpg`
              );
              fs.stat(
                thumbPath,
                (err: NodeJS.ErrnoException, stats: fs.Stats): void => {
                  if (err === null && stats.size > 0) {
                    appDebug("THUMBNAIL_SERVE_CACHE", thumbPath);
                    res();
                  } else {
                    appDebug("THUMBNAIL_START_DOWNLOAD", thumbPath);
                    // TODO: check it
                    if (vi.thumb === undefined) {
                      return;
                    }
                    https
                      .request(
                        vi.thumb.file_id,
                        (response: http.IncomingMessage): void => {
                          appDebug(
                            "THUMBNAIL_RESPONSE_STATUS_CODE",
                            response.statusCode
                          );
                          const stream: fs.WriteStream = fs.createWriteStream(
                            thumbPath
                          );
                          response
                            .on("end", (): void => {
                              appDebug("THUMBNAIL_FINISH_DOWNLOAD", thumbPath);
                              res();
                            })
                            .pipe(stream);
                        }
                      )
                      .on("error", (error: Error): void => {
                        appDebug("THUMBNAIL_ERROR", error);
                        rej(error);
                      })
                      .end((): void => {
                        appDebug("THUMBNAIL_END");
                      });
                  }
                }
              );
            }
          );

        const videoDownload: (
          vi: IStateYoutubeDownloadResultInsertQuery
        ) => Promise<null> = (
          vi: IStateYoutubeDownloadResultInsertQuery
        ): Promise<null> =>
          new Promise(
            (
              res: (value?: null | PromiseLike<null>) => void,
              rej: (reason?: Error) => void
            ): void => {
              const videoPath: string = path.resolve(
                __dirname,
                "../../asset",
                `${vi.id}.mp4`
              );
              fs.stat(
                videoPath,
                (err: NodeJS.ErrnoException, stats: fs.Stats): void => {
                  if (err === null && stats.size > 0) {
                    appDebug("VIDEO_SERVE_CACHE", videoPath);
                    res();
                  } else {
                    appDebug("VIDEO_START_DOWNLOAD", videoPath);
                    https
                      .request(
                        vi.file_id,
                        (response: http.IncomingMessage): void => {
                          appDebug(
                            "VIDEO_RESPONSE_STATUS_CODE",
                            response.statusCode
                          );
                          const stream: fs.WriteStream = fs.createWriteStream(
                            videoPath
                          );
                          response
                            .on("end", (): void => {
                              appDebug("VIDEO_FINISH_DOWNLOAD", videoPath);
                              res();
                            })
                            .pipe(stream);
                        }
                      )
                      .on("error", (error: Error): void => {
                        appDebug("VIDEO_ERROR", error);
                        rej(error);
                      })
                      .end((): void => {
                        appDebug("VIDEO_END");
                      });
                  }
                }
              );
            }
          );

        Promise.all([thumbDownload(videoInfo), videoDownload(videoInfo)])
          .then(() => {
            videoInfo.file_id = path.resolve(
              __dirname,
              "../../asset",
              `${videoInfo.id}.mp4`
            );
            if (videoInfo.thumb !== undefined) {
              videoInfo.thumb.file_id = path.resolve(
                __dirname,
                "../../asset",
                `${videoInfo.id}.jpg`
              );
            }
            resolve(videoInfo);
          })
          .catch((reason: Error) => {
            reject(reason);
          });
      };

      https
        .request(
          `https://www.youtube.com/get_video_info?video_id=${videoId}`,
          (response: http.IncomingMessage): void => {
            appDebug("RESPONSE_STATUS_CODE", response.statusCode);
            const chunks: Uint8Array[] = [];
            response
              .on("data", (chunk: Uint8Array): void => {
                appDebug("DATA", chunk);
                chunks.push(chunk);
              })
              .on("end", (): void => {
                const body: string = Buffer.concat(chunks).toString();
                appDebug("BODY", body);
                const videoInfos: IStateYoutubeDownloadResultInsertQuery[] = parseVideoInfo(
                  body
                );
                downloadVideo(videoInfos);
              });
          }
        )
        .on("error", (error: Error): void => {
          appDebug("ERROR", error);
          reject(error);
        })
        .end((): void => {
          appDebug("END");
        });
    }
  );

export { youtubeDownload };
