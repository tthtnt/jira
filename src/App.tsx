import { useAuth } from "context/auth-context";
import "./App.css";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticateddApp } from "unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticateddApp />}
    </div>
  );
}

export default App;
