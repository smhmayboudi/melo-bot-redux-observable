import { IPassportElementError } from "./iPassportElementError";

export interface IPassportElementErrorDataField extends IPassportElementError {
  data_hash: string;
  field_name: string;
}