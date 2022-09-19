import SignInPage from "./pages/SignInPage";
import React from "react";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UnpublishedSignals from "./pages/UnpublishedSignals";
import UpdateData from "./pages/UpdateData";
import ForgetPassword from "./pages/ForgetPassword";
import DisclaimerPage from "./pages/DisclaimerPage";
import DonationPage from "./pages/DonationPage";
import SocialMediaPage from "./pages/SocialMediaPage";
import { Provider, useDispatch } from "react-redux";
import store from "./store/index";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import { dataActions } from "./store/data-slice";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Legal from "./pages/Legal";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    onValue(ref(db, "DATA_FROM_STORE"), (snapshot) => {
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
    onValue(ref(db, "DISCLAIMER"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        dispatch(dataActions.setDisclaimer(data["DISCLAIMER"]));
      }
    });
    onValue(ref(db, "DONATION"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        dispatch(dataActions.setDonation(data["DONATION"]));
      }
    });
    onValue(ref(db, "SOCIAL"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        dispatch(dataActions.setSocial(data["SOCIAL"]));
      }
    });
    onValue(ref(db, "LEGAL"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        dispatch(dataActions.setLegal(data["LEGAL"]));
      }
    });
  });
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/forget" element={<ForgetPassword />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tableofcontent" element={<UnpublishedSignals />} />
              <Route path="/updatedata" element={<UpdateData />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/donation" element={<DonationPage />} />
              <Route path="/social" element={<SocialMediaPage />} />
              <Route path="/legal" element={<Legal />} />
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <App />
      </LocalizationProvider>
    </Provider>
  );
}
