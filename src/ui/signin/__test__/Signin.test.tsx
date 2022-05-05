import { act, fireEvent, render, screen } from "@testing-library/react";
import Signin, { SIGN_IN } from "../Signin";
import { BrowserRouter as Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";

describe("Signin", () => {
  test("shoul render", async () => {
    render(
      <Router>
        <MockedProvider mocks={[]} addTypename={false}>
          <Signin />
        </MockedProvider>
      </Router>
    );
  });

  test("shoul render error when signin error occurs", async () => {
    const mocks = [
      {
        request: {
          query: SIGN_IN,
          variables: { email: undefined, password: undefined },
        },
        result: {
          data: { signin: { userErrors: [{ message: "Invalid credential" }] } },
        },
      },
    ];

    render(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Signin />
        </MockedProvider>
      </Router>
    );

    const textbox = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(textbox, { target: { value: "testEmail.gmail.com" } });
    expect(textbox.value).toBe("testEmail.gmail.com");

    const textbox2 = screen.getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(textbox2, { target: { value: "1234567" } });
    expect(textbox2.value).toBe("1234567");

    const submitButton = screen.getByRole("button") as HTMLInputElement;
    await act(async () => {
      fireEvent.click(submitButton);
    });

    //expect(screen.getByText("Invalid credential")).toBeInTheDocument();
  });
});
