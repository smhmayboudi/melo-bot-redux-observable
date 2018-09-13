import { IPassportElementError } from "./iPassportElementError";

export interface IPassportElementErrorUnspecified extends IPassportElementError {
  element_hash: string;
}