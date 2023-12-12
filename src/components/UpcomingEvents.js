import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//STYLING
import "../css/Events.css"
//API
// const API = process.env.REACT_APP_API_URL;

export default function UpcomingEvents({ event }) {

  const calculateDaysUntil = () => {
    const today = new Date();
    const signUp = new Date(event.open_date);
    const timeDifference = signUp.getTime() - today.getTime();
    const daysUntil = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysUntil;
  };

  return (
    <div className="card upcoming-container dark-mode light-mode">
      <img
        className="future-img card-img"
        src={event.image_url}
        alt={event.title}
      />
      <h5 className="days-until">
        {calculateDaysUntil(event.date)} days until the event
      </h5>
    </div>
  );
}