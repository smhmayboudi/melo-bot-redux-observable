import { IPassportElementError } from "./iPassportElementError";

export interface IPassportElementErrorFile extends IPassportElementError {
  file_hash: string;
}