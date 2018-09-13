import { IFile } from "../types/iFile";

export interface getFile {
  (
    file_id: string,
  ): IFile
}
