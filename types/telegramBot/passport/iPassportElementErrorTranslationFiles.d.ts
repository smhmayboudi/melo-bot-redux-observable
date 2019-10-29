import { IPassportElementError } from "./iPassportElementError";

export interface PassportElementErrorTranslationFiles
  extends IPassportElementError {
  file_hashes: string[];
}
