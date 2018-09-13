import { IPassportElementError } from "./iPassportElementError";

export interface setPassportDataErrors {
  (
    errors: IPassportElementError[],
    user_id: number,
  ): boolean
}