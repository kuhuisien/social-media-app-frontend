import { formatDate } from "../formatDate";

describe("formatDate", () => {
  it("return empty string when input is empty string", () => {
    const formattedDatetimeStr = formatDate("");
    expect(formattedDatetimeStr).toEqual("");
  });

  it("return empty string when input is undefined", () => {
    const formattedDatetimeStr = formatDate(undefined);
    expect(formattedDatetimeStr).toEqual("");
  });

  it("return empty string when input is NULL", () => {
    const formattedDatetimeStr = formatDate(null);
    expect(formattedDatetimeStr).toEqual("");
  });

  it("return empty string for input string that cannot be parsed as number", () => {
    const formattedDatetimeStr = formatDate("asdf");
    expect(formattedDatetimeStr).toEqual("");
  });

  it("return well-formatted datetime string", () => {
    const formattedDatetimeStr = formatDate("1651562107328");
    expect(formattedDatetimeStr).toEqual("Tue, 03 May 2022, 3:15pm");
  });
});
