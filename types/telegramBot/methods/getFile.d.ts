import { IFile } from "../types/iFile";

export interface GetFile {
  (file_id: string): IFile;
}
