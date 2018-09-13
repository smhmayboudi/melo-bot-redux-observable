import { IPassportElementError } from "./iPassportElementError";

export interface IPassportElementErrorTranslationFile extends IPassportElementError {
  file_hash: string;
}