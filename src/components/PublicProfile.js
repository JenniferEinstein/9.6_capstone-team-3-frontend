//DEPENDENCIES
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

// COMPONENTS

import "../css/UserProfile.css"

const API = process.env.REACT_APP_API_URL;

export default function Profile({user, userData}) {
  console.log(userData)
  console.log(user.likes)  
  const [picturePosts, setPicturePosts] = useState([]);
  const [postsToggle, setPostsToggle] = useState(false);
  const [interestsToggle, setInterestsToggle] = useState(true);
  const navigate = useNavigate()
  const { userId } = useParams();

  const defaultImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";

  const handlePictureChangeToFirebase = () => {

  }

  const handleClick = () => {
    if (user.profile_pic === defaultImageUrl) {
      navigate('./account-edit')
      console.log(`Redirect to edit page for user with ID ${userId}`);
    } else {
      navigate('./account-edit')
      console.log(`Show zoom-in options for user with ID ${userId}`);
    }
  };
  const handlePostsToggle = () => {
    setPostsToggle(true)
    setInterestsToggle(false)
  }
  const handleInterestToggle = () => {
    setPostsToggle(false)
    setInterestsToggle(true)
  }
  const points = user.points === null ? 0 : user.points
  //Getting The Dates 
  const regularDateFormat = user.date_created.split("T")[0].split("-")
  const monthJoined = regularDateFormat[1]
  const yearJoined = regularDateFormat[0]


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
    <div className='profile-container'>
      <div className='profile-header'>
        <img className='cover-pic' src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZWJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D"/>
      </div>
      <div className='profile-content'>
        <section className='bio-container-left'>
          <div className='pfp-container'>
          { user.profile_pic ? 
              ( <img className='pfp-uploaded' 
              onClick={handleClick}
              src= {user.profile_pic}
              /> 
              ) 
              : 
              (<img className='pfp' 
              src= {defaultImageUrl}
              onClick={handleClick}/>
            )
          }
          </div>
          <div className='bio-content'>
            <p className='username'> @{user.username}</p>
          </div>
          { userData ?(
            <p>
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="#EDBB64" 
              className="bi bi-clock-fill" 
              viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
              </svg> Joined {monthJoined}-{yearJoined}
              <br />
            </p>
          ) : ( 
            <p>
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="#EDBB64" 
              className="bi bi-clock-fill" 
              viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
              </svg> Loading 
            </p>
          )}
          <p>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16"
            height="16" 
            fill="#EDBB64" 
            class="bi bi-geo-alt-fill" 
            viewBox="0 0 16 16">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
            </svg> {user.address_state}
          </p>
          <p>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="#EDBB64" 
            className="bi bi-people-fill" 
            viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
            </svg> Followers
            <span className='bio-num'> 0 </span>
          </p>
          <button className='button'> Follow </button>
            {/* <div className="logo-container">
              <img className="insta logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"/>
              <img className="fb logo" src='https://pngimg.com/uploads/facebook_logos/small/facebook_logos_PNG19757.png'/>
              <img className="twitter logo" src="https://seeklogo.com/images/T/twitter-new-logo-8A0C4E0C58-seeklogo.com.png?v=638258088440000000"/>
            </div> */}
        </section>
        <main className='posts-container-right'>
          <div className="posts-headings">
            <p id='posts' onClick={handlePostsToggle}>Posts </p>
            <p id='interests' onClick={handleInterestToggle}>Interests</p>
          {/* <h2 lassName='name'>Welcome, {userData.name_first}</h2>  */}
          {/* move the line above to Account Settings */}
          </div>
          {postsToggle ? (
            <div>
            {picturePosts.map((picturePost) => (
              <div key={picturePost.id} className="gifts-container">
                <img className="gifts" 
                src={picturePost.pictures_post_url} 
                alt={picturePost.pictures_post_title} />
              </div>
            ))}
            </div>
          ) : (
          <div className='interests-container'>
            <section className='get-to-know'>
              <h2 className=''>Likes</h2>
              <ul className='funfacts likes '>
                <li>{user.likes}</li>
                <li>Beauty Enthusiast</li>
                <li>Default Facts</li>
                <li>Athletic</li>
              </ul>
              <h2 className=''>Dislikes</h2>
              <ul className='funfacts dislikes'>
                <li>{user.likes}</li>
                <li>Beauty Enthusiast</li>
                <li>Default Facts</li>
                <li>Athletic</li>
              </ul>
            </section>
            <section className='achievements'>
              <h2 className='achievements-title'>Achievements</h2>
              <p className='points-num'>{points}</p>
              <div className=''>
                <h4 className='card-header'>Early Shipper</h4>
              </div>
              <div className='card'>
                <h4 className='card-header'>Sage</h4>
                <p className='card-header'>Leave 50 comments to complete.
                </p>
              </div>
            </section>
          </div>
          )
          }
        </main>
      </div>
    </div>
  )
}

