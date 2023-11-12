import React, { useEffect, useState } from "react";
import RightArrow from "../../icons/RightArrow-icon.svg";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../icons/search-normal.svg";
import axios from "axios";
import SmallPatient from "../../components/SmallPatient/SmallPatient";

const ViewPat = () => {
  const [Search, setSearch] = useState("");
  const [AllPatients, setAllPatients] = useState([]);
  const navigate = useNavigate();
  // =============================================
  // =============================================
  const backhome = () => {
    navigate("/");
  };
  //=================================================
  useEffect(() => {
    const GetPatients = async () => {
      await axios
        .get(`http://localhost:5000/patients/`)
        .then((response) => {
          setAllPatients(response.data.value);
        })
        .catch((error) => console.log(error.response.data));
    };
    GetPatients();
  }, [0]);
  // ================================================
  // ================================================
  const Patients = AllPatients.reverse()
    .filter((obj) => {
      return Search.toLowerCase() === ""
        ? obj
        : obj.name.toLowerCase().includes(Search.toLowerCase());
    })
    .map((obj) => {
      return <SmallPatient key={obj._id} {...obj} />;
    });
  return (
    <article className="ToT">
      <section className="discrpTitle">
        <p style={{ cursor: "pointer" }} onClick={backhome}>
          Dashboard
        </p>
        <img src={RightArrow} alt="" />
        <span> Patients</span>
      </section>
      <div className="DocCan">
        <div
          className="tit"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0 0 0",
            alignItems: "center",
          }}
        >
          <section className="middleNav">
            <div className="search">
              <img src={searchIcon} alt="this is a search icon" />
              <input
                type="text"
                placeholder="Search Name Here"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </section>
          <span
            onClick={() => {
              navigate("/add");
            }}
          >
            Add Patients
          </span>
        </div>
        <table style={{ width: "100%", margin: "10px 0 0 0" }}>
          <thead>
            <tr>
              <th>Patients name</th>
              <th>Age</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>{Patients}</tbody>
        </table>
      </div>
    </article>
  );
};

export default ViewPat;
