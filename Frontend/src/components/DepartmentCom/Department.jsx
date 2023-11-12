import React from "react";
import sideIcon from "../../icons/Phamarcy.svg";
import "./Department.css";
const Department = (props) => {
  // =======================================================================
  // This is to display the different department in the admin dashboard
  // =======================================================================
  return (
    <div className="departments">
      <div className="depImage">
        <img className="" src={sideIcon} alt="this is a side image " />
      </div>

      <div>
        <h3>{props.name}</h3>
        <h4>
          Number of Doctors <span>{props.val}</span>
        </h4>
      </div>
    </div>
  );
};

export default Department;
