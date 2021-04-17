import { IPassportElementError } from "./iPassportElementError";

export interface IPassportElementErrorReverseSide
  extends IPassportElementError {
  file_hash: string;
}
