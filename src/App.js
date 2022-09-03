import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const auth = useAuth();
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              exact
              path="/dashboard"
              element={auth === "undefined" ? <SignInPage /> : <Dashboard />}
            />
            <Route path="/" element={<SignInPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
