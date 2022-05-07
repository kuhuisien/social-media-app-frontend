import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "lib/components/Error/ErrorFallback/ErrorFallback";
import AppHeader from "lib/components/AppHeader/AppHeader";

const App = () => {
  const { pathname } = useLocation();

  const renderAppHeader = pathname !== "/signin" && pathname !== "/signup";

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {renderAppHeader && <AppHeader />}

        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

export default App;
