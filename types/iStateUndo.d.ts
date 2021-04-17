export interface IStateUndo<T> {
  _latestUnfiltered?: T;
  future: T[];
  group?: string;
  index?: number;
  limit?: number;
  past: T[];
  present: T;
}
