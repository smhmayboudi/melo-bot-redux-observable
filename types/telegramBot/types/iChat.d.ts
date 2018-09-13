import { IChatPhoto } from "../types/iChatPhoto";
import { IMessage } from "../types/iMessage";

export interface IChat {
  all_members_are_administrators?: boolean;
  can_set_sticker_set?: boolean;
  description?: string;
  first_name?: string;
  id: number;
  invite_link?: string;
  last_name?: string;
  photo?: IChatPhoto;
  pinned_message?: IMessage;
  sticker_set_name?: string;
  title?: string;
  type: string;
  username?: string;
}