import "./App.css";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "lib/components/Error/ErrorFallback/ErrorFallback";

const App = () => {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

export default App;
