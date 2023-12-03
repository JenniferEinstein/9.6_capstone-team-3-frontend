//DEPENDENCIES
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';

// COMPONENTS
// STYLING
import "../css/UserProfile.css"
// import Sidebar from './ProfileSideBar';
// API
const API = process.env.REACT_APP_API_URL;

export default function Profile({user}) {
  // This is the Profile Show(layout for every user keep general, nothing hardcoded)
  // Import users from Users.js no need to fetch
  const [picturePosts, setPicturePosts] = useState([]);

  const { userId } = useParams();
  const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";

// Have to create more dummy data in backend first then you can use this function inside the html
  const handleClick = () => {
    if (user.image_url === defaultImageUrl) {
      // Handle the case where the image is the default URL
      // You can redirect to the edit page or perform another action
      console.log(`Redirect to edit page for user with ID ${userId}`);
    } else {
      // Handle the case where the image is not the default URL
      // You can open a modal or perform another action
      console.log(`Show zoom-in options for user with ID ${userId}`);
    }
  };
  
  const joinedYear = user.date_created.split("T")[0].split("-")[0]
  const dateJoined = new Date(user.date_created)
  const monthName = dateJoined.toLocaleString('en-US', { month: 'long' });


  useEffect(() => {
    const fetchPicturePosts = async () => {
      try {
        const response = await axios.get(`${API}/pictures`);

        // Filter picture posts based on the userId
        const filteredPicturePosts = response.data.filter(
          (picturePost) => picturePost.receiver_id === parseInt(userId, 10)
        );

        setPicturePosts(filteredPicturePosts);
      } catch (error) {
        console.error('Error fetching picture posts:', error);
      }
    };

    fetchPicturePosts();
  }, [userId]);


  return (
    <div className='webpage-container'>
      <div className='left-column'>
        <ul className='menu-details'>
          <li className="sidebar-text"> 
            <Link
            className="sidebar-links" 
            to="/">
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className=" sidebar-icons bi bi-house" 
              viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
              </svg>
              HOME
            </Link>
          </li>
          <li className="sidebar-text">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            className=" sidebar-icons bi bi-bell " 
            viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
            </svg>
            NOTIFICATION
          </li>
          <li className="sidebar-text">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            className=" sidebar-icons bi bi-envelope-dash" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
              <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-5.5 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5"/>
            </svg>
            MESSAGES
          </li>
          <li className="sidebar-text">
            <Link
            className="sidebar-links" 
            to="/gallery">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" sidebar-icons bi bi-columns" viewBox="0 0 16 16">
                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm8.5 0v8H15V2zm0 9v3H15v-3zm-1-9H1v3h6.5zM1 14h6.5V6H1z"/>
              </svg>
              GALLERY WALL
            </Link> 
          </li>
          <li className="sidebar-text">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            className="sidebar-icons bi bi-gear-fill"
            viewBox="0 0 16 16">
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>
            SETTINGS
          </li>
        </ul>
      </div>
      <div className='profile-container right-column'>
        <h1></h1>
        <section className='bio-container'>
          <div className='pfp-container'>
            {/* We are going to edit the layout of this page next. */}
            <Link to={"edit"}>
              <img className='pfp' 
              src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png" }
              alt ="a person"
              onClick={handleClick}
              />
            </Link>
          </div>
          {user.tags}
          <h2 className='name'>{user.name_first}</h2>
          <p 
          className='username'> {user.username}
          <br />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EDBB64" className="bi bi-clock-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
          </svg> Joined {monthName} {joinedYear}
          <br />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EDBB64" className="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg> 0 Following/0 Followers
          </p>
          <div className="sm-logos">
            <img className="insta logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"/>
            <img className="fb logo" src='https://pngimg.com/uploads/facebook_logos/small/facebook_logos_PNG19757.png'/>
            <img className="twitter logo" src="https://seeklogo.com/images/T/twitter-new-logo-8A0C4E0C58-seeklogo.com.png?v=638258088440000000"/>
          </div>
        </section>
        <main className='posts-container'>
          <section className='col-4'>
              <h2 className=''>Get To Know Me</h2>
              <ul className='funfacts '>
                <li>Mommy</li>
                <li>Beauty Enthusiast</li>
                <li>Default Facts</li>
                <li>Athletic</li>
              </ul>
            </section>
            <section className=''>
              <h2>Achievements</h2>
              <div className='card'>
                <h4 className='card-header'>Early Shipper</h4>
              </div>
              <div className='card'>
              <h4 className='card-header'>Sage</h4>
              <p className='card-header'>Leave 50 comments to complete.
              </p>
              <img className='card-img' />
              </div>
          


            </section>
            <h2 className='col-4'>Gifts Received</h2>
            {picturePosts.map((picturePost) => (
              <div key={picturePost.id} 
              className="">
                <img className="" 
                src={picturePost.pictures_post_url} 
                alt={picturePost.pictures_post_title} />
                {/* <h3 className='picture-card-h3'>{picturePost.pictures_post_title}</h3> */}
                {/* <p>{picturePost.pictures_post_blurb}</p>
                <p>Likes: {picturePost.likes_count}</p> */}
              </div>
            ))}
            <section className=''>
              <h2>FillerText</h2>
            </section>
          <h2>FillerText</h2>
          <h2>FillerText</h2>
          <h2>FillerText</h2>
        </main>
      </div>
    </div>
  )
  // CREATE TABLE users (
  //   id SERIAL PRIMARY KEY, 
  //   username TEXT UNIQUE NOT NULL CHECK (char_length(username) > 1 AND char_length(username) <= 30),
  //   password VARCHAR(30) NOT NULL CHECK (password ~ '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$'
  //   ),
  //   admin BOOLEAN DEFAULT false,
  //   verified BOOLEAN DEFAULT false,
  //   name_first TEXT,
  //   name_last TEXT,
  //   email TEXT UNIQUE NOT NULL,
  //   address_street1 TEXT,
  //   address_street2 TEXT,
  //   address_city TEXT,
  //   address_state CHAR(2),
  //   address_zip INTEGER CHECK (address_zip >= 10000 AND address_zip <= 99999), -- Ensure it's a 5-digit number,
  //   events_joined TEXT[],
  //   exchanges_assigned TEXT[],
  //   user_banned BOOLEAN NOT NULL DEFAULT false,
  //   user_premium BOOLEAN NOT NULL DEFAULT false,
  //   user_tags TEXT[],
  //   user_profile JSONB,
  //   date_created TIMESTAMPTZ DEFAULT NOW()
  // );

}

