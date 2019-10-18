// Import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
// Import { RunHelpers } from "rxjs/internal/testing/TestScheduler";
// Import { TestScheduler } from "rxjs/testing";

// Import { youtubeDownloadObservable } from "./youtubeDownloadObservable";

// Describe("youtubeDownloadObservable lib", (): void => {
//   Let testScheduler: TestScheduler;

//   BeforeEach((): void => {
//     TestScheduler = new TestScheduler((actual: any, expected: any):
//       | boolean
//       | void => {
//       Expect(actual).toEqual(expected);
//     });
//   });

//   Test("should create an Observable", (): void => {
//     TestScheduler.run((runHelpers: RunHelpers): void => {
//       Const { cold, expectObservable } = runHelpers;
//       Const action$: ColdObservable<any> = cold("-a", {
//         A: youtubeDownloadObservable("")
//       });
//       ExpectObservable(action$).toBe("-a", { a: [] });
//     });
//   });
// });
