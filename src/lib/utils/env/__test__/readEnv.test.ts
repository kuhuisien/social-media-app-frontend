import { GRAPHQL_URL_KEY } from "../keys";
import { readEnv } from "../readEnv";

describe("ReadEnv", () => {
  it("return correct value for existing environment variable key", () => {
    const graphqlUrlValue = readEnv(GRAPHQL_URL_KEY);
    expect(graphqlUrlValue).toEqual("http://localhost:4000/graphql");
  });

  it("return undefined value for non-existing environment variable key", () => {
    const graphqlUrlValue = readEnv("non existing key");
    expect(graphqlUrlValue).toEqual(undefined);
  });
});
