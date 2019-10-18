// Import FormData from "form-data";

// Import { IStateLiterate } from "../../types/iStateLiterate";

// Import { requestUpload } from "./requestUpload";

// // jest.mock("./requestUpload");

// Describe("requestUpload lib", (): void => {
//   Const literate: IStateLiterate = { query: "HI", result: "های" };

//   Test("test requestUpload", (done: jest.DoneCallback): void => {
//     Expect.assertions(1);

//     RequestUpload(
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
