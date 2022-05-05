import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "antd";
import AppTitle from "lib/components/AppTitle/AppTitle";
import AppInput from "lib/components/formInputs/AppInput/AppInput";
import AppTextArea from "lib/components/formInputs/AppTextArea/AppTextArea";
import { TOKEN } from "lib/utils/localStorageKey";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { signupFormFields } from "./signupFormFields";

export const SIGN_UP = gql`
  mutation ($credentials: CredentialsInput!, $name: String!, $bio: String!) {
    signup(credentials: $credentials, name: $name, bio: $bio) {
      userErrors {
        message
      }
      token
    }
  }
`;

const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [signup, { data, loading }] = useMutation(SIGN_UP);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    signup({
      variables: {
        credentials: {
          email: values[signupFormFields.email],
          password: values[signupFormFields.password],
        },
        name: values[signupFormFields.name],
        bio: values[signupFormFields.bio],
      },
    });
  };

  useEffect(() => {
    if (data && data.signup) {
      if (data.signup.userErrors.length) {
        setError(data.signup.userErrors[0].message);
      }

      if (data.signup.token) {
        localStorage.setItem(TOKEN, data.signup.token);
        navigate("/");
      }
    }
  }, [data]);

  return (
    <div className={styles.signupForm}>
      <AppTitle displayText="Sign Up"></AppTitle>

      <Form onFinish={onSubmit}>
        <AppInput
          name={signupFormFields.email}
          label="Email"
          required
          type="email"
        ></AppInput>

        <AppInput
          name={signupFormFields.password}
          label="Password"
          required
          type="password"
        ></AppInput>

        <AppInput name={signupFormFields.name} label="Name" required></AppInput>

        <AppTextArea
          name={signupFormFields.bio}
          label="Bio"
          required
        ></AppTextArea>

        <Button htmlType="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </Button>

        {error && <div className={styles.signupError}>{error}</div>}
      </Form>
    </div>
  );
};

export default Signup;
