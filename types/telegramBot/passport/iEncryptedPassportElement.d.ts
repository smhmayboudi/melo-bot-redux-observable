import { IPassportFile } from "./iPassportFile";

export interface IEncryptedPassportElement {
  data?: string;
  email?: string;
  files?: IPassportFile[];
  front_side?: IPassportFile;
  hash: string;
  phone_number?: string;
  reverse_side?: IPassportFile;
  selfie?: IPassportFile;
  translation?: IPassportFile[];
  type: number;
}
