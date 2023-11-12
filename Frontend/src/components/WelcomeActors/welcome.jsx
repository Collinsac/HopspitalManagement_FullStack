import { useEffect, useState } from "react";
import "./Welcome.css";

const Welcome = (props) => {
  const [Great, setGreat] = useState("");
  const [date, setdate] = useState(new Date().getHours());
  useEffect(() => {
    // =================
    setInterval(() => {
      setdate(new Date().getHours());
    }, 1000);
    // =================
    // =================
    if (date <= 12 || date === 24) {
      setGreat("Good Morning");
    } else if (date <= 15) {
      setGreat("Good Afternoon");
    } else {
      setGreat("Good evening");
    }
    // =================
  }, []);

  // ===============================
  // ==============================
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);

    // Clean up the interval on component unmount
    // return () => {
    //   clearInterval(timerID);
    // };
  }, []);
  // ============================
  // =============================

  return (
    <section className="welcomeSec">
      <div className="InfoDiv">
        <h2>
          {Great},{" "}
          <span>
            {JSON.parse(localStorage.getItem("UserInfo")).firstName}{" "}
            {JSON.parse(localStorage.getItem("UserInfo")).lastName}
            {JSON.parse(localStorage.getItem("UserInfo")).name}
          </span>{" "}
        </h2>
        <p>Hope you doing well 😊</p>

        <h4>TIME: {currentTime.toLocaleTimeString()}</h4>
      </div>
      <div className="styleSec">
        <img src={props.image} alt="" />
      </div>
    </section>
  );
};

export default Welcome;
