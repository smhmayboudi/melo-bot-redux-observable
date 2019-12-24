export interface IStateUndoInsert<T> {
  future: T[];
  past: T[];
  present: T;
  userId: number;
}
