import React, { useEffect, useState } from "react";
import RightArrow from "../../icons/RightArrow-icon.svg";
import "./Dashboard.css";
import Welcome from "../../components/WelcomeActors/welcome";
import data from "../../assets/data";
import axios from "axios";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HashLoader from "react-spinners/HashLoader";
// ==============================================//
// =============================================//

import appointmentIcon from "../../icons/Appointment.svg";
import adminIcon from "../../icons/Admin.svg";
import doctorIcon from "../../icons/doctorsDash-icon-02.svg";
import departmentIcon from "../../icons/department.svg";
import patientIcon from "../../icons/patientDash-icon.svg";
import Department from "../../components/DepartmentCom/Department";
import DocAppointment from "../../components/DocAppointment/DocAppointment";
import SmallPatient from "../../components/SmallPatient/SmallPatient";
import ChartOne from "../../components/Charts/ChartOne";
import ChartTwo from "../../components/Charts/ChartTwo";

//====================================================
//===============The admin dashbord page=============//
//====================================================

const Dashboard = () => {
  //====================================================
  //The const Obj calls the image tobe displayed on the welcome component depending on the actor loggedIn
  //====================================================
  const Obj = data.welcome[0];

  const [CardData, setCardData] = useState([]);
  const [Departs, setDeparts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [dapartVal, setdapartVal] = useState([]);
  const [Appoint, setAppoint] = useState([]);
  const [updatedAppoint, setupdatedAppoint] = useState([]);
  const [AllPatients, setAllPatients] = useState([]);

  const navigate = useNavigate();
  localStorage.setItem("add", "patients");
  console.log({ col: updatedAppoint });

  const urls = [
    // { image: doctorIcon, link: "http://localhost:5000/phamarcies" },
    { image: adminIcon, link: "http://localhost:5000/admins" },
    { image: appointmentIcon, link: "http://localhost:5000/appoints" },
    // { image: reportIcon, link: "http://localhost:5000/reports" },
    { image: doctorIcon, link: "http://localhost:5000/doctors" },
    { image: patientIcon, link: "http://localhost:5000/patients" },
    { image: departmentIcon, link: "http://localhost:5000/departments" },
  ];

  useEffect(() => {
    urls.map(async (url) => {
      setLoading((prev) => !prev);
      await axios
        .get(url.link)
        .then((response) => {
          setCardData((prev) => {
            return [
              ...prev,
              {
                name: response.data.name,
                value: response.data.value.length,
                image: url.image,
              },
            ];
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setCardData((prev) => {
            return [
              ...prev,
              {
                name: "... ",
                value: "...",
                image: url.image,
              },
            ];
          });
          toast(`Check your Connection`, { type: "error" });
        })
        .finally(() => {
          setLoading((prev) => !prev);
        });
    });

    const sec = async () => {
      await axios
        .get("http://localhost:5000/departments/")
        .then((response) => {
          setDeparts(response.data.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };
    sec();
  }, [0]);

  useEffect(() => {
    const next = () => {
      Departs.map(async (obj) => {
        await axios
          .get(`http://localhost:5000/doctors/department/${obj._id}`)
          .then((response) => {
            // console.log(response.data);
            setdapartVal((prev) => {
              return [
                ...prev,
                { departId: obj._id, value: response.data.length },
              ];
            });
          })
          .catch((error) => {
            console.log(error.response.data);
            setdapartVal((prev) => {
              return [...prev, { departId: "...", value: "..." }];
            });
          });
      });
    };
    next();
  }, [Departs]);

  const card = CardData.map((its) => {
    return <Card key={its.name} {...its} />;
  });
  const Departments = Departs.map((obj) => {
    const orderObj = dapartVal.find(
      (orderObj) => orderObj.departId === obj._id
    );
    const value = orderObj ? orderObj.value : null;
    return <Department key={obj.name} {...obj} val={value} />;
  });

  // ===========chart data==========================//

  const ChartData = {
    labels: Departs.map((obj) => obj.name),
    datasets: [
      {
        label: "Number of Doctor",
        data: dapartVal.map((obj) => obj.value),
        backgroundColor: ["#035f06", "#6f9cdb", "#333448"],
      },
    ],
  };

  const ChartDatas = {
    labels: CardData.map((obj) => obj.name),
    datasets: [
      {
        label: "Data",
        data: CardData.map((obj) => obj.value),
        backgroundColor: ["#035f06", "#6f9cdb", "#333448"],
      },
    ],
  };

  useEffect(() => {
    const appoint = async () => {
      await axios
        .get("http://localhost:5000/appoints")
        .then((response) => {
          console.log(response.data);
          setAppoint(() => response.data.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };
    appoint();
  }, [0]);

  useEffect(() => {
    Appoint.map(async (obj) => {
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
  }, [Appoint]);

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

  const allAppoint = updatedAppoint.map((obj) => {
    return <DocAppointment key={obj._id} {...obj} />;
  });

  const Patients = AllPatients.reverse().map((obj) => {
    return <SmallPatient key={obj._id} {...obj} />;
  });

  const AllPage = () => {
    navigate("/patient");
  };

  const backhome = () => {
    navigate("/");
  };
  return (
    <article className="ToT">
      <section className="discrpTitle">
        <p onClick={backhome} style={{ cursor: "pointer" }}>
          Dashboard
        </p>
        <img src={RightArrow} alt="" />
        <span>Admin Dashboard</span>
      </section>

      <Welcome key={Obj.id} {...Obj} />

      <div className="grid">
        {Loading ? (
          <HashLoader
            color="green"
            size={60}
            style={{ placeItems: "center", padding: "50px" }}
          />
        ) : (
          card
        )}
      </div>

      <div className="chart">
        <div>
          <ChartTwo datas={ChartDatas} />
        </div>
        <div className="pie">
          {" "}
          <ChartOne datas={ChartData} />{" "}
        </div>
      </div>

      <div className="flexAppointmentDepartment">
        <div className="department">
          <h3>Departments</h3>
          {Loading ? <HashLoader color="green" size={60} /> : Departments}
        </div>
        <div className="appont">
          <div className="tit">
            <h3>All appointment</h3>
            <span onClick={() => navigate("/doctor")}>View Doctors</span>
          </div>

          <table width={"100%"}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Patient name</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{allAppoint}</tbody>
          </table>
        </div>
      </div>
      <div className="pat">
        <div className="tit">
          <h3>Patients</h3>
          <span onClick={AllPage}>All Patient</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Patient name</th>
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

export default Dashboard;
