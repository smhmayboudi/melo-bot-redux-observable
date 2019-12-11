export interface ILocale {
  find(key: string): string;
  fill(key: string, values: { [key: string]: string }): string;
}
