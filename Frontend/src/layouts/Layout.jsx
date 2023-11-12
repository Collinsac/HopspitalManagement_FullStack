import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import SideNav from "../components/SidesNav/sideNav";

import "./Layout.css";

const Layout = (props) => {
  const navigate = useNavigate();

  // ==================================================//
  // ==================================================//
  useEffect(() => {
    if (!localStorage.getItem("UserInfo")) {
      navigate("/authentication");
    }
  }, []);

  // ====================================================//
  // ===================================================//

  return (
    <>
      <Nav Systate={props.stateStyle} />
      <main>
        <SideNav style={props.sideStyle} Systate={props.stateStyle}/>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
