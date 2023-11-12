import React from "react";
import { useNavigate } from "react-router-dom";
import patM from "../../images/patM.png";
import patF from "../../images/patF.png";
const SmallPatient = (props) => {
  const navigate = useNavigate();
  // =========================================================
  // ========= This is to set the localstotage called detailId which will take the patient's Id
  // =========================================================
  localStorage.setItem("detailId", "");

  return (
    <tr style={{ cursor: "pointer" }}>
      <td
        onClick={() => {
          localStorage.setItem("detailId", props._id);
          navigate("/detail");
        }}
      >
        <img
          src={props.gender === "Male" ? patM : patF}
          alt="icon"
          style={{
            margin: "0 15px 0 5px",
            width: "40px",
            height: "40px",
            verticalAlign: "middle",
            objectFit: "cover",
            borderRadius: "50%",
            boxShadow: "0px 0px 5px 1px rgb(230, 230, 230)",
          }}
        />
        {props.name}
      </td>
      <td>{props.age}</td>
      <td>{props.DOB}</td>
      <td>{props.gender}</td>
      <td>{props.address}</td>
    </tr>
  );
};

export default SmallPatient;
