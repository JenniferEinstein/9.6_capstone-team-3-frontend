//DEPENDENCIES 
import axios from "axios";
import {useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
//STYLING
import "../css/Events.css"

export default function CurrentEvent({event}) {
  return (
    <div className="card-text">
      <img className="current-img"
      src={event.image_url}
      alt={event.title}>
      </img>
      <div className="details-CE-container">
        <h5> {event.description}
          <br />
          Required Minimum Spend: ${event.minimum_spend}
        </h5>
        <h5
        className="collapse-toggle d-inline-flex gap-1"
        data-bs-toggle="collapse" 
        data-bs-target="#collapseCurrentEvents" 
        // aria-expanded="false" 
        aria-controls="collapseCurrentEvents"
        >
          Click For More Details About This Event
        </h5>
        <div className="collapse-container row">
          <div className="collapse collapse-details collapse-vertical col" id="collapseCurrentEvents">
            <div className="card card-body collapse-card">
              <h4 className="details-CEheader">
                Important Dates
              </h4>
              <p className="details-CE">
                Sign Ups Opened: {event.open_date}
                <br />
                Sign Ups Closes: {event.close_date}
                <br />
                Matching Date: {event.matching_date}
                <br />
                Shipping Deadline: {event.shipping_deadline}
              </p>
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
