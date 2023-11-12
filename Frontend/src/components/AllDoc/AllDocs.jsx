import React from "react";
import { useNavigate } from "react-router-dom";

const AllDocs = (props) => {
  // =================================
  // =================================
  // To display one doctor tap which is used in the all doctor's page
  // =================================
  // =================================
  const Navigate = useNavigate();
  return (
    <tr
      onClick={() => {
        Navigate("/details");
        // ====================================================
        // This localStorage is to store the the doctor'sId
        // ====================================================
        localStorage.setItem("detailIdDoc", props._id);
      }}
      style={{ cursor: "pointer" }}
    >
      <td>{props.firstName}</td>
      <td>{props.DepName}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
      <td>{props.Designation}</td>
    </tr>
  );
};

export default AllDocs;
