import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { youtubeDownload } from "./youtubeDownload";

const youtubeDownloadObservable:
  (videoId: string) => Observable<any> =
  (videoId: string): Observable<any> =>
    fromPromise(youtubeDownload(videoId));

export { youtubeDownloadObservable };
