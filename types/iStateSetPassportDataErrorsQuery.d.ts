import { IPassportElementErrorDataField } from "./telegramBot/passport/iPassportElementErrorDataField";
import { IPassportElementErrorFile } from "./telegramBot/passport/iPassportElementErrorFile";
import { IPassportElementErrorFiles } from "./telegramBot/passport/iPassportElementErrorFiles";
import { IPassportElementErrorFrontSide } from "./telegramBot/passport/iPassportElementErrorFrontSide";
import { IPassportElementErrorReverseSide } from "./telegramBot/passport/iPassportElementErrorReverseSide";
import { IPassportElementErrorSelfie } from "./telegramBot/passport/iPassportElementErrorSelfie";
import { IPassportElementErrorTranslationFile } from "./telegramBot/passport/iPassportElementErrorTranslationFile";
import { PassportElementErrorTranslationFiles } from "./telegramBot/passport/iPassportElementErrorTranslationFiles";
import { IPassportElementErrorUnspecified } from "./telegramBot/passport/iPassportElementErrorUnspecified";

export interface IStateSetPassportDataErrorsQuery {
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
  >;
  user_id: number;
}
