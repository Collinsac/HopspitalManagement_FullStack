import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RightArrow from "../../icons/RightArrow-icon.svg";
import "./AddPatient.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//====================================================
//===This is the add Patient page
//====================================================

const AddPatient = () => {
  const navigate = useNavigate();
  //====================================================
  //===This function is to go back to the Dashboard
  //====================================================

  const backhome = () => {
    navigate("/");
  };
  //====================================================
  //==This useState stores info of all input
  //====================================================

  const [Formdata, setFormdata] = useState({
    name: "",
    firstName: "",
    lastName: "",
    DOB: "",
    phone: "",
    email: "",
    address: "",
    age: "",
    password: "",
    Cpassword: "",
    gender: "",
  });
  //====================================================
  //===This function set the Formdata useState
  //====================================================

  const HandelData = (e) => {
    setFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  //====================================================
  //==This function checks input validity and submit data to the backend
  //====================================================

  const SubmitData = async () => {
    //=== checks if the input are not empty

    if (
      Formdata.name !== "" &&
      Formdata.email !== "" &&
      Formdata.DOB !== "" &&
      Formdata.password !== "" &&
      Formdata.phone !== "" &&
      Formdata.gender !== ""
    ) {
      if (Formdata.Cpassword === Formdata.password) {
        //====check if the passwords match

        axios
          .post(`http://localhost:5000/patients/`, Formdata)
          .then((response) => {
            toast(`Added succesfully`, { type: "success" });
          })
          .catch((error) => toast(error.response.data, { type: "error" }));
      } else {
        //=====if the do not match error
        toast("Password does not match", { type: "error" });
      }
    } else {
      //==== if input empty error
      toast("Fill in all data", { type: "error" });
    }
  };

  return (
    <article className="ToT">
      <section className="discrpTitle">
        <p onClick={backhome} style={{ cursor: "pointer" }}>
          Dashboard
        </p>
        <img src={RightArrow} alt="" />
        <span> Add Patient</span>
      </section>

      <div className="FormCan">
        <h3>Patient Details</h3>
        <div className="secOne">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={Formdata.name}
            onChange={HandelData}
          />

          <input
            type="date"
            placeholder="Date Of Birth"
            name="DOB"
            value={Formdata.DOB}
            onChange={HandelData}
          />
        </div>
        <div className="secOne">
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={Formdata.phone}
            onChange={HandelData}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={Formdata.email}
            onChange={HandelData}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={Formdata.address}
            onChange={HandelData}
          />
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={Formdata.age}
            onChange={HandelData}
          />
        </div>

        <div className="secOne">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={Formdata.password}
            onChange={HandelData}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="Cpassword"
            value={Formdata.Cpassword}
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
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
      </div>
    </article>
  );
};

export default AddPatient;
