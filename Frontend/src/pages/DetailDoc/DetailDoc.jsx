import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RightArrow from "../../icons/RightArrow-icon.svg";

import patM from "../../images/DocM.png";
import patF from "../../images/DocF.png";
import axios from "axios";
import UserAppoint from "../../components/UserAppoint/UserAppoint";

const DetailDoc = (props) => {
  const navigate = useNavigate();
  const backhome = () => {
    navigate("/");
  };
  const backDoc = () => {
    navigate("/doctor");
  };
  const [DATA, setDATA] = useState({});
  console.log(DATA);
  useEffect(() => {
    const doc = async () => {
      await axios
        .get(
          `http://localhost:5000/doctors/${localStorage.getItem("detailIdDoc")}`
        )
        .then((response) => {
          setDATA(response.data);
        })
        .catch((error) => console.log(error.response.data));
    };
    doc();
  }, [0]);
  const [userAppoint, setuserAppoint] = useState([]);
  const [updatedAppoint, setupdatedAppoint] = useState([]);

  useEffect(() => {
    // ===============================================

    const getAppoint = async () => {
      await axios
        .get(
          `http://localhost:5000/appoints/user/${localStorage.getItem(
            "detailIdDoc"
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
        <p style={{ cursor: "pointer" }} onClick={backDoc}>
          All Doctors
        </p>
        <img src={RightArrow} alt="" />
        <span>Doctor Details</span>
      </section>

      <div className="infoCan">
        <div className="DIV">
          <img
            src={DATA.gender === "Male" || DATA.gender === "male" ? patM : patF}
            alt="icon"
          />

          <div>
            <h1>{DATA.firstName}</h1>
            <button onClick={() => navigate("/edits")}>Edit</button>
          </div>
        </div>
        <div className="secDIV">
          <table>
            <tr>
              <td>Phone:</td>
              <td>{DATA.phone}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{DATA.email}</td>
            </tr>
            <tr>
              <td>Birthday:</td>
              <td>{DATA.DOB}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{DATA.address}</td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>{DATA.gender}</td>
            </tr>
            <tr>
              <td>Designation:</td>
              <td>{DATA.Designation}</td>
            </tr>
          </table>
        </div>
      </div>

      <div
        className="appoints"
        style={{ margin: "20px 0px", padding: "20px " }}
      >
        <h3>About :</h3>
        <p style={{ color: "grey", fontWeight: "600" }}>{DATA.about}</p>
        <br />
      </div>

      {app && (
        <div className="appoints">
          <h3>Appointments</h3>

          <table>
            <thead>
              <tr>
                <th>Doctor name</th>
                <th>Patient name</th>
                <th>Date & time</th>

                <th>Status</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>{app}</tbody>
          </table>
        </div>
      )}

      <div></div>
    </article>
  );
};

export default DetailDoc;
