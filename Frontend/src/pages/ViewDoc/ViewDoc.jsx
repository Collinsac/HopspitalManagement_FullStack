import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RightArrow from "../../icons/RightArrow-icon.svg";
import searchIcon from "../../icons/search-normal.svg";

import "./ViewDoc.css";
import axios from "axios";
import AllDocs from "../../components/AllDoc/AllDocs";

const ViewDoc = () => {
  const [AllDoc, setAllDoc] = useState([]);
  const [updateAllDoc, setupdateAllDoc] = useState([]);

  const [Search, setSearch] = useState("");

  console.log(updateAllDoc);

  // ==============================================================
  // ==============================================================

  const navigate = useNavigate();

  const backhome = () => {
    navigate("/");
  };

  useEffect(() => {
    const getDoc = async () => {
      await axios.get(`http://localhost:5000/doctors/`).then((response) => {
        setAllDoc(response.data.value);
      });
    };
    getDoc();
  }, [0]);

  // ==============================================================

  useEffect(() => {
    AllDoc.map(async (obj) => {
      await axios
        .get(`http://localhost:5000/departments/${obj.departmentId}`)
        .then((response) => {
          setupdateAllDoc((prev) => {
            return [...prev, { ...obj, DepName: response.data.name }];
          });
        });
    });
  }, [AllDoc]);

  //============================================================
  //============================================================

  const Alldoctors = updateAllDoc
    .filter((obj) => {
      return Search.toLowerCase() === ""
        ? obj
        : obj.firstName.toLowerCase().includes(Search.toLowerCase());
    })
    .map((obj) => {
      return <AllDocs key={obj._id} {...obj} />;
    });
  return (
    <article className="ToT">
      <section className="discrpTitle">
        <p style={{ cursor: "pointer" }} onClick={backhome}>
          Dashboard
        </p>
        <img src={RightArrow} alt="" />
        <span> Doctors</span>
      </section>

      <div className="DocCan">
        <div
          className="tit"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0 0 0",
            alignItems:"center"
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
              navigate("/adds");
            }}
          >
            Add Doctors
          </span>
        </div>

        <table style={{ width: "100%", margin: "10px 0 0 0" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Designation</th>
            </tr>
          </thead>
          <tbody>{Alldoctors}</tbody>
        </table>
      </div>

      {/* <iframe
        src="https://trinket.io/embed/python/1cc73ecabc"
        width="100%"
        height="600"
        frameborder="0"
        marginwidth="0"
        marginheight="0"
        allowfullscreen
      ></iframe> */}
    </article>
  );
};

export default ViewDoc;
