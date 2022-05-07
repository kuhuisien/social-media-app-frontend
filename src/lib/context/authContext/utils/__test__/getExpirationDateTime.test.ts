import { getExpirationDateTime } from "../getExpirationDateTime";

describe("getExpirationDateTime", () => {
  it("return datetime string correctly", () => {
    const remainingDateTimeStr = getExpirationDateTime(60000);
    const remainingDateTime = new Date(remainingDateTimeStr);

    // expected date
    const resultDate = new Date();
    resultDate.setSeconds(resultDate.getSeconds() + 60000);

    expect(remainingDateTime.toISOString()).toEqual(resultDate.toISOString());
  });
});
