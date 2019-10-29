import { IKeyboardButton } from "./iKeyboardButton";

export interface IReplyKeyboardMarkup {
  keyboard: IKeyboardButton[][];
  one_time_keyboard?: boolean;
  resize_keyboard?: boolean;
  selective?: boolean;
}
