import React from "react";
import { useAuth } from "context/auth-context";
import "./App.css";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticateddApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticateddApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
