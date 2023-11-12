import React, { useEffect, useState } from "react";
import RightArrow from "../../icons/RightArrow-icon.svg";
import { useNavigate } from "react-router-dom";

// ============================================
// =====================================

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ===================================
// =====================================

const EditPat = () => {
  const navigate = useNavigate();
  const backhome = () => {
    navigate("/");
  };

  const [patData, setpatData] = useState({});

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

    // const getAppoint = async () => {
    //   await axios
    //     .get(
    //       `http://localhost:5000/appoints/user/${localStorage.getItem(
    //         "detailId"
    //       )}`
    //     )
    //     .then((response) => {
    //       // console.log({data:response.data})
    //       setuserAppoint(response.data);
    //     });
    // };
    // getAppoint();
  }, [0]);

  const HandelData = (e) => {
    setpatData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const SubmitData = async () => {
    if (
      patData.name !== "" &&
      patData.email !== "" &&
      patData.DOB !== "" &&
      patData.password !== "" &&
      patData.phone !== "" &&
      patData.gender !== ""
    ) {
      if (patData.Cpassword === patData.password) {
        axios
          .patch(`http://localhost:5000/patients/${localStorage.getItem("detailId")}`, patData)
          .then((response) => {
            toast(`Updated successfully`, { type: "success" });
          })
          .catch((error) => toast(error.response.data, { type: "error" }));
      } else {
        toast("Password does not match", { type: "error" });
      }
    }else {
      toast("Fill in all data", { type: "error" });
    }
  };

  return (
    <article className="ToT">
      <section className="discrpTitle">
        <p style={{ cursor: "pointer" }} onClick={backhome}>
          Dashboard
        </p>
        <img src={RightArrow} alt="" />
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/detail");
          }}
        >
          Back To {localStorage.getItem("add")} Details
        </span>
      </section>
      <div className="FormCan">
        <h3>Patient Details</h3>
        <div className="secOne">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={patData.name}
            onChange={HandelData}
          />
          <input
            type="date"
            placeholder="Date Of Birth"
            name="DOB"
            value={patData.DOB}
            onChange={HandelData}
          />
        </div>
        <div className="secOne">
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={patData.phone}
            onChange={HandelData}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={patData.email}
            onChange={HandelData}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={patData.address}
            onChange={HandelData}
          />
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={patData.age}
            onChange={HandelData}
          />
        </div>
        <div className="secOne">
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={patData.password}
            onChange={HandelData}
          />
          <input
            type="text"
            placeholder="Confirm Password"
            name="Cpassword"
            value={patData.Cpassword}
            onChange={HandelData}
          />
          <div className="radio">
            <div>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                name="gender"
                id="male"
                value={"Male"}
                onChange={HandelData}
              />
            </div>
            <div>
              <label htmlFor="Female">Female</label>
              <input
                type="radio"
                name="gender"
                id="Female"
                value={"Female"}
                onChange={HandelData}
              />
            </div>
          </div>
        </div>

        <div className="btns">
          <button className="submit" onClick={SubmitData}>
            Submit
          </button>
          <button onClick={() => navigate("/detail")}>Cancel</button>
        </div>
      </div>
    </article>
  );
};

export default EditPat;
