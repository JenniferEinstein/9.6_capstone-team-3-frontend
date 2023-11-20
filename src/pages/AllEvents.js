// DEPENDENCIES
import axios from "axios";
import { useState, useEffect } from "react";
// COMPONENTS
import UpcomingEvents from "./UpcomingEvents";
import CurrentEvent from "./CurrentEvent";
// STYLING
import "../css/Events.css"
// API
const API = process.env.REACT_APP_API_URL;

export default function AllEvents() {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isDarkMode, setDarkMode] = useState(false);


  useEffect(() => {
    axios
      .get(`${API}/events`)
      .then((response) => setEvents(response.data))
      .catch((c) => console.warn("catch", c));
  }, []);


  useEffect(() => {
      // Get today's date
      const today = new Date().toISOString().split('T')[0];
  
      // Filter events based on today's date
      const todayEvents = events.filter((event) => event.open_date <= today && today <= event.close_date);
      const futureEvents = events.filter((event)=> event.open_date > today)
      
      setUpcomingEvents(futureEvents);
      setFilteredEvents(todayEvents);

    }, [events]);

    const toggleMode = () => {
      setDarkMode(!isDarkMode);
    };
  
return (
  <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
    <button onClick={toggleMode}>Toggle Mode</button>
    <h2>Current Event</h2>
    <ul className="current-container">
      {
      filteredEvents.map((event) => (
        <div className="card">
          <li key={event.id}>{event.title}</li>
          <CurrentEvent key={event.id} event = {event}/>
        </div>
      ))}
    </ul>
    <h2 className="">Upcoming Events</h2>
    <ul className="upcoming-container">
    {
      upcomingEvents.map((event) => (
        <div className="card">
          <li key={event.id}>{event.title}</li>
          <UpcomingEvents key={event.id} event = {event}/>
        </div>
      ))}
    </ul>
  </div>
);
};
