import { IChatPhoto } from "../types/iChatPhoto";
import { IMessage } from "../types/iMessage";

export interface IChat {
  can_set_sticker_set?: boolean;
  description?: string;
  first_name?: string;
  id: number;
  invite_link?: string;
  last_name?: string;
  permissions?: IChatPermissions;
  photo?: IChatPhoto;
  pinned_message?: IMessage;
  sticker_set_name?: string;
  title?: string;
  type: string;
  username?: string;
}