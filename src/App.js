import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublishedSignals from "./pages/PublishedSignals";
import UnpublishedSignals from "./pages/UnpublishedSignals";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/publishedsignals" element={<PublishedSignals />} />
              <Route
                path="/unpublishedsignals"
                element={<UnpublishedSignals />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
