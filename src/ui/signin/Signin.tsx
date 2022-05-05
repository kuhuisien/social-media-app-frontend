import { Button, Form } from "antd";
import AppTitle from "lib/components/AppTitle/AppTitle";
import AppInput from "lib/components/formInputs/AppInput/AppInput";
import styles from "./Signin.module.css";
import { signinFormFields } from "./signinFormFields";

const Signin = () => {
  return (
    <div className={styles.signinForm}>
      <AppTitle displayText="Sign In"></AppTitle>

      <Form>
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

        <Button htmlType="submit">Sign In</Button>
      </Form>
    </div>
  );
};

export default Signin;
