import { render } from "@testing-library/react";
import Spinner from "../Spinner";

describe("Spinner", () => {
  test("shoul render", async () => {
    render(<Spinner />);
  });
});
