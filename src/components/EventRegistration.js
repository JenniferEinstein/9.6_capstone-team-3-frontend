// EventRegistration.js`

// DEPENDENCIES
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
// import { initializeApp } from 'firebase/app';
import '../pages/Modal';

// STYLING
import "../css/events_two.css"

// API
const API = process.env.REACT_APP_API_URL;




function EventRegistration ({ userData, userId }) {
    const { eventId } = useParams()
    const navigate = useNavigate()
    
    const [showDetails, setShowDetails] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [userDataForEvents, setUserDataForEvents] = useState({
        budget: 0,
        favorite_color: [], 
        shirt_size: '', 
        pants_size: '',
        shoe_size: '',
        preferred_category: '', 
        preferred_gift: '', 
        gifts_avoid :'',
        events_joined: [],
        // eventId:eventId 
    })
    
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };
    
        const handleIconClick = () => {
            setShowDetails(!showDetails);
        }
    
    
    //UPDATE
    const userEventRegistration = async (updatedUser) => {
        try {
            const response = await axios.put(`${API}/users/${userId}`, updatedUser)
            // console.log(`API Response:`, response.data)
            // console.log(userId)
        } catch(error) {
            console.error(error)
            throw error
        }
    }  
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        if (id === 'favorite_color') {
        // if (id === null) {
            const colorsArray = value.split(',').map(color => color.trim()).filter(String)
            console.log('Colors array:', colorsArray)
            setUserDataForEvents((prevUserData) => ({ ...prevUserData, favorite_color: colorsArray }))
        } else if (id === 'events_joined') {
            setUserDataForEvents((prevUserData) => ({
               ...prevUserData,
               events_joined: [...prevUserData.events_joined, value],
            }))
        } else {
            setUserDataForEvents((prevUserData) => ({ ...prevUserData, [id]: value }))
        }
        // console.log('id:', id, 'value:', value)
    }

    const handleOptionChange = (event) => {
        event.preventDefault()
        setSelectedOption(event.target.value)
        handleInputChange(event)
    }

    const handleConfirmation = async (event) => {
        event.preventDefault()
        try {
            // console.log(`Event Id:`, eventId)
            // console.log(`User Id:`, userId)
            // console.log(userDataForEvents)
                // Update the state and get the updated user data
                const updatedUserData = {
                    ...userDataForEvents,
                    events_joined: [...userDataForEvents.events_joined, eventId]
                }
                setUserDataForEvents(updatedUserData)
                setShowConfirmation(!showConfirmation)
                
                console.log("Submitting User Data:", updatedUserData)
                await userEventRegistration(updatedUserData)
                console.log("Submitted successfully")
                navigate(`/profile/${userId}`)
        } catch (error) {
            console.error(`Error Submitting`, error)
        }
    }
    
    return (
        <div className='event-registration-container'>
        <div className=''>
            <h1>{ eventId.title } Registration Form
            <span onClick={handleIconClick} className="question-icon">
                <svg xmlns="http://www.w3.org/2000/svg"  
                className="bi bi-question-circle" 
                viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                </svg>
            </span>
            </h1>
          </div>

        {showDetails && (
            <div className='why-this-form'>
                <p><strong>WHY THIS FORM?</strong></p>
                <p>You can not be matched without the information on this form. Otherwise, the person who is getting you a gift won't know anything about you.  Make sure you stick to the rules of the event to ensure you receive a gift that best suits you. </p>
            </div>
        )}
        
        <form className='registration-form'>
            <label htmlFor="preferred_gift">In thinking about the theme, what would your dream gift be?</label>
            <input type="text" id="preferred_gift" onChange={handleInputChange} value={userDataForEvents.preferred_gift} required/>
            <label htmlFor="gifts_avoid">What gift or type of gifts should your match avoid?</label>
            <input type="text" id="gifts_avoid" onChange={handleInputChange} value={userDataForEvents.gifts_avoid} required/>
            <label htmlFor="favorite_color">What's your favorite color?:</label>
            <input type="text" id="favorite_color"  onChange={handleInputChange} value={userDataForEvents.favorite_color} required/>
            <label htmlFor="preferred_category">Keeping the theme in mind, what category most interests you? (<i>e.g.</i>, candy, tech, clothing ):</label>
            <input type="text" id="preferred_category" onChange={handleInputChange} value={userDataForEvents.preferred_category} required/>
            <label htmlFor="clothes" > If you feel these are applicable, please provide your sizes.
                <label htmlFor="shirt_size">Shirt Size:
                <input type="text" id="shirt_size" onChange={handleInputChange} value={userDataForEvents.shirt_size}/>
                </label>
                <label htmlFor="pants_size">Pants Size:
                <input type="text" id="pants_size" onChange={handleInputChange} value={userDataForEvents.pants_size}/>
                </label>
                <label htmlFor="shoe_size">Shoes Size:
                <input type="text" id="shoe_size" onChange={handleInputChange} value={userDataForEvents.shoe_size}/>
                </label>
            <br />
            </label>
            <div className='rules-container2'>
                <h3 className='rules-h3'>Event Rules</h3>
                <p>
                    Complete rules can be found{" "} 
                    <span onClick={openModal} className="click-here" style={{ fontWeight: 'bold' }}>here</span>, but here are some quick reminders:
                </p>
                {isModalOpen && (

                    <Modal onClose={closeModal}>
                    <ul className='rules-container'>
                        <li className='rules'>If in the event you miss the shipping and tracking deadline or violate any of the rules or terms, you will be at risk of being banned, per investigation by our team.</li>
                        <li className='rules'>The person you will be giving a gift to is not the same person who is giving you a gift.</li>
                        <li className='rules'>We do <span className='rules-not'>NOT</span> condone derogatory, sexually explicit, or discriminatory actions such has hate speech, bullying or racially insensitive comments or gifts. Please keep everything friendly and respectful. Seek to uplift and bring joy to any and everyone's lives.</li>
                        <li className='rules'>The minimum spend is set so that no one feels cheated. Of course, anyone is allowed to spend more than the minimum.</li>
                        <li className='rules'>You are <span className='rules-not'>NOT</span> allowed to contact users to request gifts. </li>
                        <li>Do not upload a picture of the gift you are planning to send. <span className='rules-not'>NOR</span> Revealing gifts prior to unboxing spoils the fun and is unacceptable!</li>
                    </ul>    
                    </Modal>
                )}
            </div>
            <div className='terms-container2'>  
                <label htmlFor="terms-checkbox2" id='terms-text2'>
                <input type="checkbox" id="terms-checkbox2" required /> Do You Agree To The Terms? </label>
                <br />
                <h2 className=''>You're One Click Away From Spreading Happiness</h2>
                <button className="confirm button" onClick={handleConfirmation} >Confirm</button>
            </div>
        </form>
            {showConfirmation && (
                <div className='conclusion'>
                    <h2 className='concluson-h2'>Thank you for registering; you've been added to the event. </h2>
                    <h3 className='conclusion-h3'>Check your messages and notification in the app for updates.</h3>
                </div>
            )}
    </div>
  )
}

export default EventRegistration