import React from "react";
// ===============================================================
// == This is the component that displays the appointment in the Doctor's profile
// ===============================================================
const UserAppoint = (props) => {
  return (
    <tr>
      <td>{props.DocName}</td>
      <td>{props.patName}</td>
      <td>
        {props.Date} at <span>{props.startTime}</span>
      </td>
      <td>
        <div>{props.Status}</div>
      </td>
      <td>{props.note}</td>
    </tr>
  );
};

export default UserAppoint;
