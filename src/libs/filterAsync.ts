import { MonoTypeOperatorFunction, Observable, pipe } from "rxjs";
import { concatMap, filter, mapTo } from "rxjs/operators";

const filterAsync: <T>(
  predicate: (data: T, index: number) => Observable<boolean>
) => MonoTypeOperatorFunction<T> = <T>(
  predicate: (data: T, index: number) => Observable<boolean>
): MonoTypeOperatorFunction<T> =>
  pipe(
    concatMap((data: T, index: number) =>
      predicate(data, index).pipe(
        filter((value: boolean) => value === true),
        mapTo(data)
      )
    )
  );

export { filterAsync };
