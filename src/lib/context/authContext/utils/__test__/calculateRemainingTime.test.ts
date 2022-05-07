import { calculateRemainingTime } from "../calculateRemainingTime";

describe("calculateRemainingTime", () => {
  it("return zero when input is empty string", () => {
    const remainingTime = calculateRemainingTime("");
    expect(remainingTime).toEqual(0);
  });

  it("return zero when input is invalid datetime string", () => {
    const remainingTime = calculateRemainingTime("asdf");
    expect(remainingTime).toEqual(0);
  });

  it("return positive number when input is valid future datetime string", () => {
    // construct a future datetime string
    const datetimeInput = new Date();
    datetimeInput.setHours(new Date().getHours() + 1);
    const datetimeInputStr = datetimeInput.toISOString();

    const remainingTime = calculateRemainingTime(datetimeInputStr);
    expect(remainingTime).toBeGreaterThan(0);
  });

  it("return negative number when input is valid past datetime string", () => {
    // construct a past datetime string
    const datetimeInput = new Date();
    datetimeInput.setHours(new Date().getHours() - 1);
    const datetimeInputStr = datetimeInput.toISOString();

    const remainingTime = calculateRemainingTime(datetimeInputStr);
    expect(remainingTime).toBeLessThan(0);
  });
});
