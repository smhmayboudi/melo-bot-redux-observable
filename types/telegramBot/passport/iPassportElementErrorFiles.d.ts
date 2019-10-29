import { IPassportElementError } from "./iPassportElementError";

export interface IPassportElementErrorFiles extends IPassportElementError {
  file_hashes: string[];
}
