import { youtube_v3 } from "googleapis";

export interface IStateCallbackQueryDataInsertQuery {
  chart?: string;
  nextPageToken?: string | null;
  pageInfo?: youtube_v3.Schema$PageInfo;
  prevPageToken?: string | null;
  q?: string;
  userId?: number;
}
