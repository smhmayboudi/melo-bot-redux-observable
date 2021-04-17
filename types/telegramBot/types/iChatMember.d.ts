import { IUser } from "./iUser";

export interface IChatMember {
  can_add_web_page_previews?: boolean;
  can_be_edited?: boolean;
  can_change_info?: boolean;
  can_delete_messages?: boolean;
  can_edit_messages?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
  can_post_messages?: boolean;
  can_promote_members?: boolean;
  can_restrict_members?: boolean;
  can_send_media_messages?: boolean;
  can_send_messages?: boolean;
  can_send_other_messages?: boolean;
  can_send_polls?: boolean;
  is_member?: boolean;
  status: string;
  until_date?: number;
  user: IUser;
}
