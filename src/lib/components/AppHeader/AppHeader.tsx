import { Button, PageHeader } from "antd";
import { AuthContext } from "lib/context/authContext/authContext";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AppHeader = () => {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isSignedIn = authCtx.isSignedIn;

  const onSigninButtonClick = () => {
    navigate("/signin");
  };

  const onSignupButtonClick = () => {
    navigate("/signup");
  };

  return (
    <PageHeader
      ghost={false}
      onBack={pathname === "/" ? undefined : () => navigate(-1)}
      extra={[
        isSignedIn && (
          <Button key="profile" type="primary">
            My profile
          </Button>
        ),
        isSignedIn && (
          <Button key="logout" onClick={() => authCtx.signout()}>
            Log out
          </Button>
        ),
        !isSignedIn && (
          <Button key="signin" onClick={onSigninButtonClick}>
            Sign in
          </Button>
        ),
        !isSignedIn && (
          <Button key="signup" onClick={onSignupButtonClick}>
            Sign up
          </Button>
        ),
      ]}
    ></PageHeader>
  );
};

export default AppHeader;
