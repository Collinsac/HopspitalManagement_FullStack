import React from "react";
import './Card.css'

const Card = (props) => {
  // ==============================================================================
  // There are the Cards that display the total number of admin , doctors etc
  // ==============================================================================
  return (
    <div className="Card">
      <div className="icon">
        <img src={props.image} alt="" />
      </div>
      <h3>{props.name}</h3>
      <span>{props.value}</span>
    </div>
  );
};

export default Card;
