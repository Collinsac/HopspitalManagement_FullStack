import React, { useState } from "react";
import HospitalLogo from "../../images/hospital_logo.png";
import Avatar from "../../images/avatar.png";
import barIcon from "../../icons/bar-icon.svg";
import settingIcon from "../../icons/setting-icon.svg";

import "./Nav.css";
const Nav = (props) => {
  // =====================================================================
  // ========This usestate stores the user info from the localstorage
  // =====================================================================
  const [UserInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("UserInfo"))
  );
  // ============================================================================
  // ======this is the function that affects  the sidenav which is called by the button there in the nav
  // ============================================================================
  const sideNavToggle = () => {
    props.Systate((prev) => !prev);
  };
  // ==========================================================================
  return (
    <nav className="nav">
      <section className="leftNav">
        <div className="logotitle">
          <img
            src={HospitalLogo}
            alt="This is the hospital logo which is displayed on the nav"
          />
          <h3>CSSI</h3>
        </div>
        <img
          src={barIcon}
          alt="this is the hamburger menu"
          className="barIcon"
          onClick={sideNavToggle}
        />
      </section>

      <section className="middleNav">
        {/* <div className="search">
          <img src={searchIcon} alt="this is a search icon" />
          <input type="text" placeholder="Search here" />
        </div> */}
      </section>

      <section className="rightNav">
        <div className="info">
          <div>
            {localStorage.getItem("UserInfo") && (
              <h4>
                {UserInfo.firstName} {UserInfo.lastName} {UserInfo.name}
              </h4>
            )}
            <small>{localStorage.getItem("Role")}</small>
          </div>
          <img src={Avatar} alt="User Profile picture" />
        </div>
        <img src={settingIcon} alt="setting icon" className="barIcon" />
      </section>
    </nav>
  );
};

export default Nav;
