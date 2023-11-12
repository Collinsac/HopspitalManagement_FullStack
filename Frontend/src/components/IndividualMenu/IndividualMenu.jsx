import React, { useState } from "react";
import "./IndividualMenu.css";
// import dashboardIcon from "../../icons/dashboard-icon.svg";
import RightArrowIcon from "../../icons/RightArrow-icon.svg";
import { useNavigate } from "react-router-dom";

const IndividualMenu = (props) => {
  // ========================================================================//
  // ========= This usestate is to affect the style of the sideNav ========= //
  // ========================================================================//
  const [display, setdisplay] = useState(false);

  // ====================================================//
  const navigate = useNavigate();
  //   ==================================================//

  // ==============This function is to change the style of the side Nav ==============//
  const styleDisplay = {
    can: {
      display: display ? "block" : "none",
    },
    icon: {
      transform: display ? "rotatez(90deg)" : "rotate(0deg)",
    },
  };
  //==================================================================//
  // =====This to a function to change the usestate named display=====//
  //==================================================================//
  const toggleDisplay = () => {
    setdisplay((prev) => !prev);
  };
  //===================================================//
  //===== This submenu it the submenu of the menus in the side nav =====//
  //===================================================//

  const submenu = props.subMenu.map((obj) => {
    if (obj.Role.includes(localStorage.getItem("Role")) || obj.Role === "All") {
      return (
        <p
          key={obj.id}
          style={props.textNone}
          onClick={() => navigate(obj.Route)}
        >
          {obj.title}
        </p>
      );
    }
  });

  // =====================================================================================//
  // =====================================================================================//

  return (
    <div className="IndividualMenu">
      <div className="Uppersec" onClick={toggleDisplay}>
        <div className="iconCan">
          <img src={props.image} alt="this this the dashboard icon" />
        </div>
        <p style={props.textNone}>{props.title}</p>
        <img
          src={RightArrowIcon}
          alt="this is a right arrow icon"
          className="Arrow"
          style={styleDisplay.icon}
        />
      </div>

      <div className="Lowersec" style={styleDisplay.can}>
        {submenu}
      </div>
    </div>
  );
};

export default IndividualMenu;
