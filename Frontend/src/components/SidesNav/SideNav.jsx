import React from "react";
import "./SideNav.css";
import IndividualMenu from "../IndividualMenu/IndividualMenu";
import data from "../../assets/data";
const SideNav = (props) => {
  // ========================================================================================
  // ===This is the constant that makes use of a component to display the different menu in the side nav
  // ========================================================================================
  const Individualmenu = data.menu.map((obj) => {
    if (obj.Role.includes(localStorage.getItem("Role")) || obj.Role === "All") {
      return (
        <IndividualMenu
          key={obj.id}
          {...obj}
          textNone={props.style.textNone}
          state={props.Systate}
        />
      );
    }
  });
  // ==========================================================================================
  return (
    <nav className="sidenav" style={props.style.can}>
      <p>Main</p>
      <div className="ActorCan">{Individualmenu}</div>
    </nav>
  );
};

export default SideNav;
