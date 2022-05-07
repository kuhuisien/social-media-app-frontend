import { TOKEN_STR } from "lib/utils/localStorageKey";
import { retrieveStoredToken } from "../retrieveStoredToken";

describe("retrieveStoredToken", () => {
  it("return null if local storage does not contain token field", () => {
    const result = retrieveStoredToken();
    expect(result).toEqual(null);
  });

  it("return token data if local storage contains token field and future expiration time which is more than 1 minute ahead", () => {
    const MOCK_TOKEN = "asdf";

    jest.spyOn(window.localStorage.__proto__, "setItem");
    window.localStorage.__proto__.getItem = jest
      .fn()
      .mockImplementation((key) => {
        // mock local storage token string field
        if (key === TOKEN_STR) {
          return MOCK_TOKEN;
        } else {
          // mock local storage token expiratiion datetime string field
          const expirationDateTime = new Date();
          // mock expiration to be one hour ahead
          expirationDateTime.setHours(new Date().getHours() + 1);
          return new Date(expirationDateTime.toISOString());
        }
      });

    const result = retrieveStoredToken();
    expect(result?.token).toEqual(MOCK_TOKEN);
    expect(result?.duration).toEqual(3600000); // one hour = 3600000 milli sec
  });

  it("return null if local storage contains token field and future expiration time which is less than 1 minute ahead", () => {
    const MOCK_TOKEN = "asdf";

    jest.spyOn(window.localStorage.__proto__, "setItem");
    window.localStorage.__proto__.getItem = jest
      .fn()
      .mockImplementation((key) => {
        // mock local storage token string field
        if (key === TOKEN_STR) {
          return MOCK_TOKEN;
        } else {
          // mock local storage token expiratiion datetime string field
          const expirationDateTime = new Date();
          // mock expiration to be five seconds ahead
          expirationDateTime.setSeconds(new Date().getSeconds() + 5);
          return new Date(expirationDateTime.toISOString());
        }
      });

    const result = retrieveStoredToken();
    expect(result).toEqual(null);
  });

  it("return null if local storage contains token field and past expiration time", () => {
    const MOCK_TOKEN = "asdf";

    jest.spyOn(window.localStorage.__proto__, "setItem");
    window.localStorage.__proto__.getItem = jest
      .fn()
      .mockImplementation((key) => {
        // mock local storage token string field
        if (key === TOKEN_STR) {
          return MOCK_TOKEN;
        } else {
          // mock local storage token expiratiion datetime string field
          const expirationDateTime = new Date();
          // mock expiration to be past datetime
          expirationDateTime.setSeconds(new Date().getSeconds() - 5);
          return new Date(expirationDateTime.toISOString());
        }
      });

    const result = retrieveStoredToken();
    expect(result).toEqual(null);
  });
});
