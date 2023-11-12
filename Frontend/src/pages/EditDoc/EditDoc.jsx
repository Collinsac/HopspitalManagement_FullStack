import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RightArrow from "../../icons/RightArrow-icon.svg";
import axios from "axios";
import { toast } from "react-toastify";

const EditDoc = () => {
  const [Formdata, setFormdata] = useState({
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
    Designation: "",
    about: "",
    departmentId: "",
  });
  console.log(Formdata)
  const [department, setdepartment] = useState([]);
  const navigate = useNavigate();

  const backhome = () => {
    navigate("/");
  };

  const HandelData = (e) => {
    setFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    const getAllDepartments = async () => {
      await axios
        .get(`http://localhost:5000/departments/`)
        .then((response) => {
          setdepartment(response.data.value);
        })
        .catch((error) => console.log(error.response.data));
    };
    getAllDepartments();
  }, [0]);

  const displayDepart = department.map((obj) => {
    return (
      <option value={obj._id} key={obj._id}>
        {obj.name}
      </option>
    );
  });

  useEffect(() => {
    const getDetails = async () => {
      await axios
        .get(
          `http://localhost:5000/doctors/${localStorage.getItem("detailIdDoc")}`
        )
        .then((response) => {
          setFormdata(response.data);
        });
    };
    getDetails();
  }, [0]);

  const SubmitData = async () => {
    if (
      Formdata.firstName !== "" &&
      Formdata.email !== "" &&
      Formdata.DOB !== "" &&
      Formdata.password !== "" &&
      Formdata.phone !== "" &&
      Formdata.gender !== ""
    ) {
      if (Formdata.Cpassword === Formdata.password) {
        axios
          .patch(`http://localhost:5000/doctors/${localStorage.getItem('detailIdDoc')}`, Formdata)
          .then((response) => {
            toast(`updated succesfully`, { type: "success" });
          })
          .catch((error) => toast(error.response.data, { type: "error" }));
      } else {
        toast("Password does not match", { type: "error" });
      }
    } else {
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
        <span>Edit Doctor</span>
      </section>

      <div className="FormCan">
        <h3>Doctor Details</h3>
        <div className="secOne">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={Formdata.firstName}
            onChange={HandelData}
          />

          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={Formdata.lastName}
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
          {/* <input
            type="text"
            placeholder="Age"
            name="age"
            value={Formdata.age}
            onChange={HandelData}
          /> */}
        </div>

        <div className="secOne">
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={Formdata.password}
            onChange={HandelData}
          />
          <input
            type="text"
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

        <div className="secOne">
          <input
            type="text"
            placeholder="Designation"
            name="Designation"
            value={Formdata.Designation}
            onChange={HandelData}
          />
          <select
            name="departmentId"
            id="departmentId"
            value={Formdata.departmentId}
            onChange={HandelData}
          >
            <option value="">--Choose--</option>
            {displayDepart}
          </select>
        </div>
        <div className="secOne">
          <textarea
            id=""
            cols="30"
            rows="10"
            placeholder="about"
            name="about"
            value={Formdata.about}
            onChange={HandelData}
          ></textarea>
        </div>

        <div className="btns">
          <button className="submit" onClick={SubmitData}>Submit</button>
          <button onClick={() => navigate("/details")}>Cancel</button>
        </div>
      </div>
    </article>
  );
};

export default EditDoc;
