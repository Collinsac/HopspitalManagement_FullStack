import React, { useEffect, useState } from "react";
import RightArrow from "../../icons/RightArrow-icon.svg";
import { useNavigate } from "react-router-dom";

// ================================================
// ===============================================

import patM from "../../images/patM.png";
import patF from "../../images/patF.png";

// =======================================================
// ======================================================

import "./DetailPatient.css";
import axios from "axios";
import UserAppoint from "../../components/UserAppoint/UserAppoint";
const DetailPatient = () => {
  const [patData, setpatData] = useState({});

  const [userAppoint, setuserAppoint] = useState([]);
  const [updatedAppoint, setupdatedAppoint] = useState([]);

  console.log(userAppoint);
  useEffect(() => {
    const getPatient = async () => {
      await axios
        .get(
          `http://localhost:5000/patients/${localStorage.getItem("detailId")}`
        )
        .then((response) => {
          setpatData(response.data);
        });
    };
    getPatient();

    // ===============================================

    const getAppoint = async () => {
      await axios
        .get(
          `http://localhost:5000/appoints/user/${localStorage.getItem(
            "detailId"
          )}`
        )
        .then((response) => {
          // console.log({data:response.data})
          setuserAppoint(response.data);
        });
    };
    getAppoint();
  }, [0]);

  useEffect(() => {
    userAppoint.map(async (obj) => {
      await axios
        .get(`http://localhost:5000/doctors/${obj.doctorId}`)
        .then(async (response) => {
          await axios
            .get(`http://localhost:5000/patients/${obj.patientId}`)
            .then((res) => {
              console.log(res.data.name);
              setupdatedAppoint((prev) => [
                ...prev,
                {
                  ...obj,
                  DocName: response.data.firstName,
                  patName: res.data.name,
                },
              ]);
            });
        })
        .catch((error) => console.log(error.response.data));
    });
  }, [userAppoint]);

  const navigate = useNavigate();

  const backhome = () => {
    navigate("/");
  };

  const app = updatedAppoint.map((obj) => {
    return <UserAppoint key={obj._id} {...obj} />;
  });
  return (
    <article className="ToT">
      <section className="discrpTitle">
        <p style={{ cursor: "pointer" }} onClick={backhome}>
          Dashboard
        </p>
        <img src={RightArrow} alt="" />
        <span>{localStorage.getItem("add")} Details</span>
      </section>

      <div className="infoCan">
        <div className="DIV">
          <img src={patData.gender === "Male" ? patM : patF} alt="icon" />

          <div>
            <h1>{patData.name}</h1>
            
            <button onClick={()=>{navigate('/edit')}}>Edit</button>
          </div>
        </div>
        <div className="secDIV">
          <table>
            <tr>
              <td>Phone:</td>
              <td>{patData.phone}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{patData.email}</td>
            </tr>
            <tr>
              <td>Birthday:</td>
              <td>{patData.DOB}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{patData.address}</td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>{patData.gender}</td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>{patData.age}</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="appoints">
        <h3>Appointments</h3>

        <table>
          <thead>
            <tr>
              <th>Doctor name</th>
              <th>Date & time</th>

              <th>Status</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>{app}</tbody>
        </table>
      </div>
    </article>
  );
};

export default DetailPatient;
