import React from "react";
import RightArrow from "../../icons/RightArrow-icon.svg";
import Welcome from "../../components/WelcomeActors/welcome";
import "./Dashboard.css";
import data from "../../assets/data";
const Dashboard = () => {
  const Obj = data.welcome[2];
  
  return (
    <article className="ToT">
      <section className="discrpTitle">
        <p>Dashboard</p>
        <img src={RightArrow} alt="" />
        <span>Patient Dashboard</span>
      </section>

      <Welcome key={Obj.id} {...Obj}/>
    </article>
  );
};

export default Dashboard;
