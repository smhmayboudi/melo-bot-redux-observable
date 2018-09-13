import { IEncryptedCredentials } from "./iEncryptedCredentials";
import { IEncryptedPassportElement } from "./iEncryptedPassportElement";

export interface IPassportData {
  credentials: IEncryptedCredentials;
  data: IEncryptedPassportElement[];
}