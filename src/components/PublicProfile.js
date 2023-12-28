//DEPENDENCIES
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

// COMPONENTS

import "../css/UserProfile.css"

const API = process.env.REACT_APP_API_URL;

export default function Profile({user, userData}) {
  console.log(userData)
  const [picturePosts, setPicturePosts] = useState([]);
  const navigate = useNavigate()
  const { userId } = useParams();

  const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";


  const handleClick = () => {
    if (user.image_url === defaultImageUrl) {

      console.log(`Redirect to edit page for user with ID ${userId}`);
    } else {

      console.log(`Show zoom-in options for user with ID ${userId}`);
    }
  };
  
  


  useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //     const response = await axios.get(`${API}/users/${userId}`);
    //     setUser(response.data);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    // }

    const fetchPicturePosts = async () => {
      try {
        const response = await axios.get(`${API}/pictures`);
        const filteredPicturePosts = response.data.filter(
          (picturePost) => picturePost.receiver_id === parseInt(userId, 10)
        );
        setPicturePosts(filteredPicturePosts);
      } catch (error) {
        console.error('Error fetching picture posts:', error);
      }
    }
    fetchPicturePosts();
  }, [userId]);


  return (
    <div className='profile-container right-column'>
      <h2 className='name'>Welcome, {user.name_first}</h2>
      <section className='bio-container'>
        <div className='pfp-container'>
          <Link to={"edit"}>
            <img className='pfp' 
            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png" }
            alt ="a person"
            onClick={handleClick}
            />
          </Link>
        </div>
        <p 
        className='username'> 
        {user.username}
        <br />
        {/* { userData ?(
          <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EDBB64" className="bi bi-clock-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
            </svg> 
            Joined {monthName} {joinedYear}
            <br />
          </div>
        ) : ( <div>Hi</div>
  
        )} */}
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="#EDBB64" 
        className="bi bi-people-fill" 
        viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
        </svg> 0 Following/0 Followers
        </p>
        {/* <div className="logo-container">
          <img className="insta logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"/>
          <img className="fb logo" src='https://pngimg.com/uploads/facebook_logos/small/facebook_logos_PNG19757.png'/>
          <img className="twitter logo" src="https://seeklogo.com/images/T/twitter-new-logo-8A0C4E0C58-seeklogo.com.png?v=638258088440000000"/>
        </div> */}
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
              <h2 className='achievements-title'>Achievements</h2>
              <div className=''>
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
  )
}

