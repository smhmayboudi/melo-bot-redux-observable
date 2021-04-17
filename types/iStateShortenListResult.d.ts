export interface IStateShortenListResult {
  alphabet: string;
  count: number;
  date: Date | null;
  id: number;
  longLink: string;
  longBase64: string | null;
  shortLink: string;
}
