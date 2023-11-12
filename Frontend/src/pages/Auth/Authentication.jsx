import { useState } from "react";
import authSideImg from "../../images/Authentification_side_image.png";
import HospitalLogo from "../../images/hospital_logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HashLoader from "react-spinners/HashLoader";

import "./Auth.css";

const Authentication = (props) => {
  // ===============================================
  const navigate = useNavigate();
  // ===============================================

  const [Role, setRole] = useState({ role: "Patient", route: "patients" });
  const [Formdata, setFormdata] = useState({ email: "", password: "" });

  const [Loading, setLoading] = useState(false);

  // ==================== All my function========================//

  localStorage.setItem("Role", Role.role);
  // console.log(Formdata);

  const ArrayR = [
    {
      id: 1,
      role: "Patient",
      route: "patients",
    },
    {
      id: 2,
      role: "doctor",
      route: "doctors",
    },
    // {
    //   id: 3,
    //   role: "phamarcy",
    //   route: "phamarcies",
    // },
    {
      id: 4,
      role: "Admin",
      route: "admins",
    },
  ];

  const opt = ArrayR.map((it) => (
    <div
      key={it.id}
      onClick={() => {
        setRole((prev) => ({ ...prev, role: it.role, route: it.route }));
      }}
    >
      {it.role}
    </div>
  ));

  const Handledata = (event) => {
    setFormdata((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const SubmitForm = async () => {
    setLoading((prev) => !prev);
    await axios
      .post(`http://localhost:5000/${Role.route}/auth`, Formdata)
      .then(function (response) {
        localStorage.setItem("UserInfo", JSON.stringify(response.data));

        toast("You logged in Successfully!", { type: "success" });
        navigate("/");
        
      })
      .catch(function (error) {
        // console.log(error.message);
        toast(`${error.response.data}`, { type: "error" });
      })
      .finally(function () {
        // always executed
        setLoading((prev) => !prev);
         props.setUpdate(prev=>prev+1)
      });
  };

  return (
    <>
      <article className="sign_container">
        <section className="image_can">
          <img
            src={authSideImg}
            alt="This is a simple side image in the login and side in page"
          />
        </section>
        <section className="formSection">
          <div className="auth_container">
            <div className="logotitle">
              <img
                src={HospitalLogo}
                alt="This is the Hospital logo at the begining of the authentication container"
              />
              <h2>Centre de Sante de Soins Infirmier</h2>
            </div>

            <h2 className="title">{`Login As ${Role.role}`}</h2>

            <input
              type="email"
              placeholder="Email *"
              name="email"
              onChange={Handledata}
              value={Formdata.email}
            />
            <input
              type="password"
              placeholder="Password *"
              name="password"
              onChange={Handledata}
              value={Formdata.password}
            />

            <div className="option">{opt}</div>

            <button onClick={SubmitForm}>
              {Loading ? <HashLoader color="#e9eaf6" size={20} /> : "Login"}
            </button>

            <p>
              Need an account or Encountered a problem?{" "}
              <span>Contact The Hospital</span>
            </p>
          </div>
        </section>
      </article>
    </>
  );
};

export default Authentication;
