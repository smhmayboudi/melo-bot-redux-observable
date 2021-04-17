import { IPollOption } from "./iPollOption";

export interface IPoll {
  id: string;
  is_closed: boolean;
  options: IPollOption[];
  question: string;
}
