import { ICommandOptions } from "./iCommandOptions";

export interface ICommand<TOpts extends ICommandOptions = ICommandOptions> {
  name: string;
  options?: TOpts;
}
