import { liveness, readiness } from "./kubernetesProbs";

describe("kubernetesProbs configs", (): void => {
  test("should handle liveness", (): void => {
    expect(liveness).toEqual(true);
  });

  test("should handle readiness", (): void => {
    expect(readiness).toEqual(true);
  });
});
