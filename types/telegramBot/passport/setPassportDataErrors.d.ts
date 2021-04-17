import { IPassportElementErrorDataField } from "./iPassportElementErrorDataField";
import { IPassportElementErrorFile } from "./iPassportElementErrorFile";
import { IPassportElementErrorFiles } from "./iPassportElementErrorFiles";
import { IPassportElementErrorFrontSide } from "./iPassportElementErrorFrontSide";
import { IPassportElementErrorReverseSide } from "./iPassportElementErrorReverseSide";
import { IPassportElementErrorSelfie } from "./iPassportElementErrorSelfie";
import { IPassportElementErrorTranslationFile } from "./iPassportElementErrorTranslationFile";
import { PassportElementErrorTranslationFiles } from "./iPassportElementErrorTranslationFiles";
import { IPassportElementErrorUnspecified } from "./iPassportElementErrorUnspecified";

export interface SetPassportDataErrors {
  (
    errors: Array<
      | IPassportElementErrorDataField
      | IPassportElementErrorFile
      | IPassportElementErrorFiles
      | IPassportElementErrorFrontSide
      | IPassportElementErrorReverseSide
      | IPassportElementErrorSelfie
      | IPassportElementErrorTranslationFile
      | PassportElementErrorTranslationFiles
      | IPassportElementErrorUnspecified
    >,
    user_id: number
  ): boolean;
}
