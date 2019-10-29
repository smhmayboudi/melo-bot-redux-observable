import { IPassportElementError } from "./iPassportElementError";

export interface IPassportElementErrorSelfie extends IPassportElementError {
  file_hash: string;
}
