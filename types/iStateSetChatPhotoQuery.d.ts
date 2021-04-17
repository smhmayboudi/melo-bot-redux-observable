import { IInputFile } from "./telegramBot/types/iInputFile";

export interface IStateSetChatPhotoQuery {
  chat_id: number | string;
  photo: IInputFile;
}
