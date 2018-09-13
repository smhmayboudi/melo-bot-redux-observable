import { IPassportElementError } from "./iPassportElementError";

export interface IPassportElementErrorFrontSide extends IPassportElementError {
  file_hash: string;
}