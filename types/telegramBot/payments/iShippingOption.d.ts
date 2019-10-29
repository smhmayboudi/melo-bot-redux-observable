import { ILabeledPrice } from "./iLabeledPrice";

export interface IShippingOption {
  id: string;
  prices: ILabeledPrice[];
  title: string;
}
