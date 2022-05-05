import { render } from "@testing-library/react";
import Signin from "../Signin";

describe("Signin", () => {
  test("shoul render", async () => {
    render(<Signin />);
  });
});
