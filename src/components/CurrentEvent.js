//DEPENDENCIES 
import axios from "axios";
import {useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
//STYLING
import "../css/Events.css"

export default function CurrentEvent({event, userData, userId}) {  
  
  const eventId = event.id
  const signup = event.open_date.split('T')[0].split("-")
  const close = event.close_date.split('T')[0].split("-")
  const match = event.match_date.split('T')[0].split("-")
  const ship = event.shipping_deadline.split('T')[0].split("-")
  const year = event.open_date.split("T")[0].slice(0,4)
  const closeDate = new Date(event.close_date).getTime();
  
  const calculateCountDown = () => {
    const today = new Date().getTime();
    return closeDate - today;
  };
  
  const [deadline, setDeadline] = useState(calculateCountDown());
  // console.log(deadline)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDeadline(calculateCountDown());
    }, 1000);
    // console.log(event.id)
    return () => clearInterval(intervalId);
  }, []);
  
  const formatCountDown = (countdown) => {
    if (countdown < 0) {
      return `OUR NEXT EVENT IS STARTING SHORTLY.`;
    }
    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  return (
    <div className="" >
      {userData}
      <div className="container">
        <img className="current-img"
        src={event.image_url}
        alt={event.title}>
        </img>
      </div>
      <div className="container">
        <div className="description-CE-container">
          <h5 className="description-event-title"> {event.title} </h5>
          <h5 className="description">{event.description}</h5>
          <div className=" row">
            <div className="col">
              <div className="collapse-card">
                <h2 className="details-CEheader">Event Timeline</h2>
                <p className="details-CE">
                  <span className="timeline">Registration Period: </span>{signup[1]}/{signup[2]}/{year} - {close[1]}/{close[2]}/{year}
                  <br />
                  <span className="timeline">Match Date: </span>{match[1]}/{match[2]}/{year} 
                  <br />
                  <span className="timeline">Shipping Timeframe: </span>{match[1]}/{match[2]}/{year} - {ship[1]}/{ship[2]}/{year} 
                  <br/>
                  {deadline <= 0 ? (
                    <span className="deadline">EVENT CLOSED: {formatCountDown(deadline)}</span>
                    ) : (
                      <span className="deadline">EVENT CLOSES: {formatCountDown(deadline)}</span>
                      )}
                </p>
                      <h5 className="description-price-title"><span className="price-title">Minimum Spend:</span><span className="price">${event.minimum_spend}</span></h5>
                {deadline <= 0 ? (
                    <div className="join-container">
                    </div>
                ) : (
                  <div className="join-container">
                    <Link to={`/events/${eventId}/register/${userId}`} event = {event} className="join-now">Register Here</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT,
  description TEXT,
  image_url TEXT,
  open_date TIMESTAMPTZ,
  close_date TIMESTAMPTZ,
  match_date DATE,
  minimum_spend INT,
  shipping_deadline DATE,
  participants_signed_up INT,
  participants_matched INT,
  matches_made_count INT DEFAULT 0,
  matches_pending INT,
  matches_completed_count INT DEFAULT 0,
  admin_notes TEXT,
  creation_date TI
      } */}
    </div>
  )
}
