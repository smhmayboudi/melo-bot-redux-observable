// Import FormData from "form-data";

// Import { IStateLiterate } from "../../types/iStateLiterate";

// Import { requestsUpload } from "./requestsUpload";

// // jest.mock("./requestsUpload");

// Describe("requestsUpload lib", (): void => {
//   Const literate: IStateLiterate = { query: "HI", result: "های" };

//   Test("test requestsUpload", (done: jest.DoneCallback): void => {
//     Expect.assertions(1);

//     RequestsUpload(
//       {
//         Path: "/litrate/HI"
//       },
//       New FormData()
//     )
//       .then((value: any): void => {
//         Expect(value).toEqual(literate);
//         Done();
//       })
//       .catch((_reason: any): void => {
//         Done();
//       });
//   });
// });
