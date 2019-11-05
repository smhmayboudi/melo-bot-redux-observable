import { IVideo } from "./telegramBot/types/iVideo";

export interface IStateYoutubeDownloadResultInsertQuery extends IVideo {
  id: string;
  title: string;
}
