import React from "react";
import "./DocAppointment.css";

const DocAppointment = (props) => {
  // =================================================================================
  // This component is to display the appointment of doctors in the admin dashboard
  // =================================================================================
  return (
    <tr>
      <td>{props.patName}</td>
      <td>{props.DocName}</td>
      <td>
        {props.Date} at <span>{props.startTime}</span>
      </td>
      <td>
        <div>{props.Status}</div>
      </td>
    </tr>
  );
};

export default DocAppointment;
