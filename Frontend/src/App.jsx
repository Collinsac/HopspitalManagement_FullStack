import "./App.css";
import Authentication from "./pages/Auth/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
// =====================================================//

import PatientDash from "./pages/PatientDash/Dashboard";
import DoctorDash from "./pages/DoctorDash/Dashboard";
import AdminDash from "./pages/AdminDash/Dashboard";
import PhamarcyDash from "./pages/PhamarcyDash/Dashboard";

// =================================================//
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import AddPatient from "./pages/AddPatient/AddPatient";
import DetailPatient from "./pages/DetailPatient/DetailPatient";
import ViewDoc from "./pages/ViewDoc/ViewDoc";
import DetailDoc from "./pages/DetailDoc/DetailDoc";
import AddDoc from "./pages/AddDoc/AddDoc";
import EditDoc from "./pages/EditDoc/EditDoc";
import EditPat from "./pages/EditPat/EditPat";
import ViewPat from "./pages/ViewPat/ViewPat";
import AddDepartment from "./pages/AddDepartment/AddDepartment";

function App() {
  const [component, setComponent] = useState(null);
  const [Update, setUpdate] = useState(2);

  useEffect(() => {
    const storedData = localStorage.getItem("Role");
    if (storedData) {
      if (storedData === "Patient") {
        setComponent(<PatientDash />);
        // alert("patient")
      } else if (storedData === "doctor") {
        setComponent(<DoctorDash />);
        // alert("doctor")
      } else if (storedData === "Admin") {
        setComponent(<AdminDash />);
        // alert("admin")
      } else {
        setComponent(<PhamarcyDash />);
      }
    }
  }, [Update]);

  // =======================================//

  const [SetStyles, setSetStyles] = useState(true);

  const style = {
    can: {
      width: SetStyles ? "95px" : "",
    },

    textNone: {
      display: SetStyles ? "none" : "",
    },
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/authentication"
            element={<Authentication setUpdate={setUpdate} />}
          />
          <Route
            path="/"
            element={<Layout sideStyle={style} stateStyle={setSetStyles} />}
          >
            <Route index element={component} />
            <Route path="/adds" element={<AddDoc />} />
            <Route path="/add" element={<AddPatient />} />
            <Route path="/detail" element={<DetailPatient />} />
            <Route path="/doctor" element={<ViewDoc />} />
            <Route path="/patient" element={<ViewPat />} />
            <Route path="/details" element={<DetailDoc />} />
            <Route path="/edits" element={<EditDoc />} />
            <Route path="/edit" element={<EditPat/>} />
            <Route path="/addDepartment" element={<AddDepartment/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
