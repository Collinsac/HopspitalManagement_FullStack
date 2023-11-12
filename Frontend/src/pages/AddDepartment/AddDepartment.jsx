import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//====================================================
//=====This is the add department page
//====================================================
const AddDepartment = () => {
  // =====================================================
  // ============ This usestate is to collect the data to be posted to the backend
  // =====================================================
  const [Formdata, setFormdata] = useState({
    name: "",
    discription: "",
  });
  // ==============================================
  // ==============================================
  const navigate = useNavigate();
  // ===============================================
  // =======The backHome function is to navigate back to the dashoard
  //====================================================
  const backhome = () => {
    navigate("/");
  };

  //===================================================
  //==============This function sets the Formdata to be passed to the backend
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
  //====This function checks input validity and submit's data to the backend with Axios
  //====================================================
  const SubmitData = () => {
    //======checks if name and discrip are empty
    if (Formdata.name === "" || Formdata.discription === "") {
      toast(`Fill All Data`, { type: "warning" });
    } else {
      //======If they are not empty it call's axios to post the data to the backend
      axios
        .post(`http://localhost:5000/departments/`, Formdata)
        .then((response) => {
          toast(`Added Successful`, { type: "success" });
        })
        .catch((error) => {
          toast(`${error.response.data}`, { type: "error" });
        });
    }
  };
  return (
    <article className="ToT">
      <section className="discrpTitle">
        <p onClick={backhome} style={{ cursor: "pointer" }}>
          Dashboard
        </p>
      </section>

      <div className="FormCan">
        <h3>Add Department</h3>
        <div className="secOne">
          <input
            type="text"
            placeholder="Department Name"
            name="name"
            value={Formdata.name}
            onChange={HandelData}
          />
        </div>
        <div className="secOne">
          <textarea
            id=""
            // cols="30"
            rows="10"
            placeholder="Department Description"
            name="discription"
            value={Formdata.discription}
            onChange={HandelData}
          ></textarea>
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

export default AddDepartment;
