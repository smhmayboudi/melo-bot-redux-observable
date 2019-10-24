import { IFmtList } from "./iFmtList";

export interface IVideoInfo {
  dur: number;
  fileId?: string;
  fmtList: IFmtList;
  id: string;
  itag: number;
  mime: string;
  thumbnailFileId?: string;
  thumbnailUrl: string;
  title: string;
  url: string;
}
