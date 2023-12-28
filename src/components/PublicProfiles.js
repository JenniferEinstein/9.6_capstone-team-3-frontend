// DEPENDENCIES
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// COMPONENT
import PublicProfile from "./PublicProfile";
// import Sidebar from "./ProfileSideBar";
// STYLING
import "../css/UserProfile.css"
// APT
const API = process.env.REACT_APP_API_URL;

export default function PublicProfiles({userData}) {
  // Profile Index
  const [users, setUsers] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${API}/users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users", error));
  }, []);


  const user = users.find((user) => user.id === parseInt(userId));

  return (
    <div className="webpage-container">
      <div className='left-column'>
        <ul className='menu-details'>
          <li className="sidebar-text"> 
            <Link
            className="sidebar-links" 
            to="/">
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className=" sidebar-icons bi bi-house" 
              height="20"
              width="20"
              viewBox="0 0 16 16"
              >
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
              </svg>
              {/* HOME */}
            </Link>
          </li>
          <li className="sidebar-text">
            <svg 
            xmlns="http://www.w3.org/2000/svg"  
            className=" sidebar-icons bi bi-bell " 
            height="20"
            width="20"
            viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
            </svg>
            {/* NOTIFICATION */}
          </li>
          <li className="sidebar-text">
            <Link 
            className="sidebar-links"
            to="./MessageMatch.js">
              <svg 
              xmlns="http://www.w3.org/2000/svg"  
              className=" sidebar-icons bi bi-envelope-dash" 
              height="20"
              width="20"
              viewBox="0 0 16 16"
              >
                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-5.5 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5"/>
              </svg>
              {/* MESSAGES */}
            </Link>
          </li>
          <li className="sidebar-text">
            <Link
            className="sidebar-links" 
            to="/gallery">
              <svg xmlns="http://www.w3.org/2000/svg"
              className=" sidebar-icons bi bi-columns" 
              height="20"
              width="20"
              viewBox="0 0 16 16"
              >
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm8.5 0v8H15V2zm0 9v3H15v-3zm-1-9H1v3h6.5zM1 14h6.5V6H1z"/>
              </svg>
              {/* GALLERY WALL */}
            </Link> 
          </li>
          <li className="sidebar-text">
            <svg 
            xmlns="http://www.w3.org/2000/svg"  
            className="sidebar-icons bi bi-gear-fill"
            height="20"
            width="20"
            viewBox="0 0 16 16"
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>
            {/* <span className="icon-hidden">SETTINGS</span> */}
          </li>
        </ul>
      </div>
      {/* <Sidebar /> */}
      {user ? (
        <ul className=" profile right-column">
          <PublicProfile key={user.id} user={user} userData = {userData} />
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
