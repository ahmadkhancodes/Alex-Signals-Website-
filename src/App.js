import SignInPage from "./pages/SignInPage";
import React from "react";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublishedSignals from "./pages/PublishedSignals";
import UnpublishedSignals from "./pages/UnpublishedSignals";
import UpdateData from "./pages/UpdateData";
import { Provider, useDispatch } from "react-redux";
import store from "./store/index";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { dataActions } from "./store/data-slice";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        var arr = [];
        console.log(data["DATA_FROM_STORE"]);
        for (let i = 0; i < data["DATA_FROM_STORE"].length; i++) {
          arr.push(data["DATA_FROM_STORE"][i]);
        }
        dispatch(dataActions.setAllData(arr));
      }
      console.log("DATA fetched from APP.JS");
    });
  });
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
              <Route path="/updatedata" element={<UpdateData />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
