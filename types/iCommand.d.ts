import { ICommandOptions } from "./iCommandOptions";

export interface ICommand<TOpts = ICommandOptions> {
  name: string;
  options?: TOpts;
}
