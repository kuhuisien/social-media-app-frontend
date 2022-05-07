import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "antd";
import AppTitle from "lib/components/AppTitle/AppTitle";
import AppInput from "lib/components/formInputs/AppInput/AppInput";
import { AuthContext } from "lib/context/authContext/authContext";
import { getExpirationDateTime } from "lib/context/authContext/utils/getExpirationDateTime";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signin.module.css";
import { signinFormFields } from "./signinFormFields";

export const SIGN_IN = gql`
  mutation ($credentials: CredentialsInput!) {
    signin(credentials: $credentials) {
      userErrors {
        message
      }
      token
      expiresIn
    }
  }
`;

const Signin = () => {
  const navigate = useNavigate();

  const authCxt = useContext(AuthContext);

  const [signin, { data, loading }] = useMutation(SIGN_IN);

  const [error, setError] = useState("");

  useEffect(() => {
    if (data && data.signin) {
      if (data.signin.userErrors.length) {
        setError(data.signin.userErrors[0].message);
      }

      if (data.signin.token) {
        const expirationDateTime = getExpirationDateTime(data.signin.expiresIn);
        authCxt.signin(data.signin.token, expirationDateTime);
        navigate("/");
      }
    }
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    signin({
      variables: {
        credentials: {
          email: values[signinFormFields.email],
          password: values[signinFormFields.password],
        },
      },
    });
  };

  return (
    <div className={styles.signinForm}>
      <AppTitle displayText="Sign In"></AppTitle>

      <Form onFinish={onSubmit}>
        <AppInput
          name={signinFormFields.email}
          label="Email"
          required
          type="email"
        ></AppInput>

        <AppInput
          name={signinFormFields.password}
          label="Password"
          required
          type="password"
        ></AppInput>

        <Button htmlType="submit" disabled={loading} loading={loading}>
          Sign in
        </Button>

        {error && <div className={styles.signinError}>{error}</div>}
      </Form>
    </div>
  );
};

export default Signin;
